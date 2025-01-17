<?php

namespace App\Http\Controllers\MarketPlace;

use App\Http\Controllers\Controller;
use App\Http\Requests\FinanceAircraftRequest;
use App\Models\Enums\TransactionTypes;
use App\Models\FinanceAgreement;
use App\Services\Aircraft\CreateAircraft;
use App\Services\Finance\AddUserTransaction;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FinanceNewController extends Controller
{
    protected CreateAircraft $createAircraft;
    protected AddUserTransaction $addUserTransaction;

    public function __construct(CreateAircraft $createAircraft, AddUserTransaction $addUserTransaction)
    {
        $this->createAircraft = $createAircraft;
        $this->addUserTransaction = $addUserTransaction;
    }

    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(FinanceAircraftRequest $request): RedirectResponse
    {
        // check balance & process funds
        if ($request->deposit > Auth::user()->balance) {
            return redirect()->back()->with(['error' => 'Insufficient funds']);
        }

        //create aircraft and engine(s)
        $aircraft = $this->createAircraft->execute($request->all(), Auth::user()->id);

        //create credit record
        $agreement = new FinanceAgreement();
        $agreement->user_id = Auth::user()->id;
        $agreement->aircraft_id = $aircraft->id;
        $agreement->deposit = $request->deposit;
        $agreement->finance_amount = $request->financeAmount;
        $agreement->term_months = $request->term;
        $agreement->monthly_payments = $request->monthlyPayments;
        $agreement->amount_remaining = $request->financeAmount;
        $agreement->term_remaining = $request->term;
        $agreement->missed_payments = 0;
        $agreement->save();

        //create transaction
        if ($request->deposit > 0) $this->addUserTransaction->execute(Auth::user()->id, TransactionTypes::AircraftPurchase, -$request->deposit);

        return redirect()->to('/aircraft/'.$aircraft->id)->with(['success' => 'Aircraft financed']);
    }
}
