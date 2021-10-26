<?php

namespace Tests\Unit\Services\Pirep;

use App\Models\Aircraft;
use App\Models\Booking;
use App\Models\Contract;
use App\Models\ContractCargo;
use App\Models\Enums\AirlineTransactionTypes;
use App\Models\Enums\PointsType;
use App\Models\Enums\TransactionTypes;
use App\Models\Fleet;
use App\Models\Flight;
use App\Models\Pirep;
use App\Models\PirepCargo;
use App\Models\User;
use App\Services\PirepService;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Event;
use Tests\TestCase;

class CalculatePointsTest extends TestCase
{
    use RefreshDatabase;

    protected Model $user;
    protected Model $pirep;
    protected Model $pirepCargo;
    protected Model $contract;
    protected Model $contractCargo;
    protected Model $fleet;
    protected Model $aircraft;
    protected Model $booking;
    protected PirepService $pirepService;

    public function setUp(): void
    {
        parent::setUp(); // TODO: Change the autogenerated stub
        $this->pirepService = new PirepService();

        $this->user = User::factory()->create([
            'rank_id' => 1,
            'flights_time' => 299,
            'points' => 49,
            'created_at' => Carbon::now()->addYears(-2)
        ]);
        $this->fleet = Fleet::factory()->create();
        $this->aircraft = Aircraft::factory()->create([
            'fleet_id' => $this->fleet->id,
            'fuel_onboard' => 50,
            'current_airport_id' => 'AYMN',
            'user_id' => $this->user->id,
            'hub_id' => 'AYMR'
        ]);
        DB::table('cargo_types')->insert([
            ['type' => 1, 'text' => 'Solar Panels'],
            ['type' => 1, 'text' => 'Building materials'],
            ['type' => 2, 'text' => 'Medics'],
            ['type' => 2, 'text' => 'Locals'],
        ]);

        $this->contract = Contract::factory()->create([
            'contract_value' => 250.00,
            'dep_airport_id' => 'AYMN',
            'arr_airport_id' => 'AYMR'
        ]);
        $this->contractCargo = ContractCargo::factory()->create([
            'contract_id' => $this->contract->id,
            'current_airport_id' => $this->contract->dep_airport_id
        ]);
        $this->pirep = Pirep::factory()->create([
            'user_id' => $this->user->id,
            'destination_airport_id' => 'AYMR',
            'departure_airport_id' => 'AYMN',
            'aircraft_id' => $this->aircraft
        ]);

        $this->pirepCargo = PirepCargo::factory()->create([
            'pirep_id' => $this->pirep->id,
            'contract_cargo_id' => $this->contractCargo->id
        ]);
    }
    /**
     * A basic unit test example.
     *
     * @return void
     */
    public function test_completed_flight_points()
    {
        $this->pirepService->calculatePoints($this->pirep);
        $this->assertDatabaseHas('points', [
            'pirep_id' => $this->pirep->id,
            'type_name' => PointsType::COMPLETED_FLIGHT_LABEL,
            'points' => PointsType::COMPLETED_FLIGHT
        ]);
    }

    public function test_hub_points_for_flight_inc_hub()
    {
//        $pirep = Pirep::factory()->create([
//            'user_id' => $this->user->id,
//            'aircraft_id' => $this->aircraft->id
//        ]);
        $this->pirepService->calculatePoints($this->pirep);
        $this->assertDatabaseHas('points', [
            'pirep_id' => $this->pirep->id,
            'type_name' => PointsType::HOME_HUB_LABEL,
            'points' => PointsType::HOME_HUB
        ]);
    }

    public function test_hub_bonus_for_flight_inc_hub()
    {
//        $pirep = Pirep::factory()->create([
//            'user_id' => $this->user->id,
//            'aircraft_id' => $this->aircraft->id
//        ]);
        $this->pirepService->calculatePoints($this->pirep);
        $this->assertDatabaseHas('user_accounts', [
            'user_id' => $this->pirep->user_id,
            'flight_id' => $this->pirep->id,
            'type' => TransactionTypes::Bonus
        ]);

        $this->assertDatabaseHas('account_ledgers', [
            'transaction_type' => AirlineTransactionTypes::ContractExpenditure,
            'pirep_id' => $this->pirep->id,
            'total' => -200
        ]);
    }

    public function test_hub_points_for_flight_exc_hub()
    {
        $contract = Contract::factory()->create([
            'contract_value' => 250.00,
            'dep_airport_id' => 'EGLL',
            'arr_airport_id' => 'EGSS'
        ]);
        $contractCargo = ContractCargo::factory()->create([
            'contract_id' => $contract->id,
            'current_airport_id' => $contract->dep_airport_id
        ]);

        $pirep = Pirep::factory()->create([
            'user_id' => $this->user->id,
            'aircraft_id' => $this->aircraft->id,
            'departure_airport_id' => $contract->dep_airport_id,
            'destination_airport_id' => $contract->arr_airport_id
        ]);

        $pirepCargo = PirepCargo::factory()->create([
            'pirep_id' => $pirep->id,
            'contract_cargo_id' => $contractCargo->id
        ]);

        $this->pirepService->calculatePoints($pirep);
        $this->assertDatabaseMissing('points', [
            'pirep_id' => $pirep->id,
            'type_name' => PointsType::HOME_HUB_LABEL,
            'points' => PointsType::HOME_HUB
        ]);
    }

    public function test_distance_points_under_50()
    {
        $pirep = Pirep::factory()->create([
            'user_id' => $this->user->id,
            'aircraft_id' => $this->aircraft->id,
            'distance' => 45
        ]);

        $expected = 0;
        $this->pirepService->calculatePoints($pirep);
        $this->assertDatabaseHas('points', [
            'pirep_id' => $pirep->id,
            'type_name' => PointsType::FIFTY_MILES_LABEL,
            'points' => $expected
        ]);
    }

    public function test_distance_points_100()
    {
        $pirep = Pirep::factory()->create([
            'user_id' => $this->user->id,
            'aircraft_id' => $this->aircraft->id,
            'distance' => 100
        ]);

        $expected = 4;
        $this->pirepService->calculatePoints($pirep);
        $this->assertDatabaseHas('points', [
            'pirep_id' => $pirep->id,
            'type_name' => PointsType::FIFTY_MILES_LABEL,
            'points' => $expected
        ]);
    }

    public function test_distance_points_200()
    {
        $pirep = Pirep::factory()->create([
            'user_id' => $this->user->id,
            'aircraft_id' => $this->aircraft->id,
            'distance' => 200
        ]);

        $expected = 8;
        $this->pirepService->calculatePoints($pirep);
        $this->assertDatabaseHas('points', [
            'pirep_id' => $pirep->id,
            'type_name' => PointsType::FIFTY_MILES_LABEL,
            'points' => $expected
        ]);
    }
}
