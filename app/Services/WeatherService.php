<?php

namespace App\Services;


use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;

class WeatherService
{
    private $apiKey = 'a12889c7844f470580dca7f41c';
    private $baseMetarUrl = 'https://api.checkwx.com/metar/';

    public function getMetar(string $icao): string
    {
        // check if metar exists in cache
        if (Cache::has($icao.'-metar')) {
            return Cache::get($icao.'-metar');
        }
        // get metar for icao
        $response = Http::withHeaders([
            'X-API-KEY' => $this->apiKey
        ])->get($this->baseMetarUrl.$icao);


        if (!$response->json(['results']) == 1) {
            // if no metar, get nearest
            $response = Http::withHeaders([
                'X-API-KEY' => $this->apiKey
            ])->get($this->baseMetarUrl.$icao.'/nearest');
            return $this->returnMetarAsString($response, $icao);
        }

        return $this->returnMetarAsString($response, $icao);


    }

    protected function returnMetarAsString($data, string $icao): string
    {
        $metar = implode($data->json(['data']));
        Cache::put($icao.'-metar', $metar, now()->addHours(2));
        return $metar;
    }
}
