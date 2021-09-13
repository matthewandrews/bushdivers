import React from 'react'
import Layout from '../../Shared/Layout'
import PageTitle from '../../Shared/Navigation/PageTitle'
import { Link, usePage } from '@inertiajs/inertia-react'
import FlightMap from '../../Shared/Components/Flights/FlightMap'

const Dispatch = ({ pirep, depMetar, arrMetar }) => {
  console.log(pirep.cargo)
  const Pax = () => {
    return (
      <div>
        <span className="mr-2">PAX:</span>
        {pirep.pax > 0
          ? (
            <span>{pirep.pax} {pirep.pax_name}</span>
            )
          : <span>0</span>}
      </div>
    )
  }

  const Cargo = () => {
    return (
      <div>
        <span className="mr-2">Cargo:</span>
        {pirep.cargo > 0
          ? (
            <span>{pirep.cargo} kg {pirep.cargo_name}</span>
            )
          : <span>None</span>}
      </div>
    )
  }

  const { auth } = usePage().props
  return (
    <div>
      <PageTitle title="Dispatch - Pilot Briefing" />
      <div className="flex justify-between mb-4">
        <div className="rounded shadow p-2 w-1/5 flex bg-white">
          <i className="material-icons md-48">event_note</i>
          <div className="ml-2">
            <span className="text-2xl">BDV{pirep.flight.flight_number}</span>
            <div className="text-sm mt-2">
              <span>PIC: {auth.user.name}</span><br/>
              <span>OFP: KG | {pirep.aircraft.fleet.type}</span>
            </div>
          </div>
        </div>
        <div className="rounded shadow p-2 w-1/5 flex bg-white">
          <i className="material-icons md-48">flight_takeoff</i>
          <div className="ml-2">
            <span className="text-2xl"><Link href={`/airports/${pirep.flight.dep_airport_id}`}>{pirep.flight.dep_airport_id}</Link></span>
            <div className="text-sm mt-2">
              <div>{pirep.flight.dep_airport.name}</div>
              <div className="text-xs">{pirep.flight.dep_airport.altitude} ft</div>
              {pirep.flight.dep_airport.longest_runway_length && (
                <div className="text-xs">{pirep.flight.dep_airport.longest_runway_surface} {pirep.flight.dep_airport.longest_runway_length} x {pirep.flight.dep_airport.longest_runway_width}</div>
              )}
            </div>
          </div>
        </div>
        <div className="rounded shadow p-2 w-1/5 flex bg-white">
          <i className="material-icons md-48">flight_land</i>
          <div className="ml-2">
            <span className="text-2xl"><Link href={`/airports/${pirep.flight.arr_airport_id}`}>{pirep.flight.arr_airport_id}</Link></span>
            <div className="text-sm mt-2">
              <div>{pirep.flight.arr_airport.name}</div>
              <div className="text-xs">{pirep.flight.dep_airport.altitude} ft</div>
              {pirep.flight.arr_airport.longest_runway_length && (
                <div className="text-xs">{pirep.flight.arr_airport.longest_runway_surface} {pirep.flight.arr_airport.longest_runway_length} x {pirep.flight.arr_airport.longest_runway_width}</div>
              )}
            </div>
          </div>
        </div>
        <div className="rounded shadow p-2 w-1/5 flex bg-white">
          <i className="material-icons md-48">flight</i>
          <div className="ml-2">
            <span className="text-2xl">{pirep.aircraft.registration}</span>
            <div className="text-sm mt-2">
              <span>{pirep.aircraft.fleet.type}</span><br/>
              <span>{pirep.aircraft.fleet.manufacturer} {pirep.aircraft.fleet.name}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="rounded bg-white shadow w-full mb-4 p-6 flex justify-between content-center">
        <div className="w1/5 p-4 flex flex-col items-center">
          <span className="text-xl mb-2">{pirep.flight.distance} nm</span>
          <span className="text-sm">Distance</span>
        </div>
        <div className="w1/5 p-4 flex flex-col items-center">
          <span className="text-xl mb-2">{pirep.planned_cruise_altitude} ft</span>
          <span className="text-sm">Planned Cruise Alt</span>
        </div>
        <div className="w1/5 p-4 flex flex-col items-center">
          <span className="text-xl mb-2">26 gal</span>
          <span className="text-sm">Suggested Fuel</span>
        </div>
        <div className="w1/5 p-4 flex flex-col items-center">
          <span className="text-xl mb-2">1,200 kg</span>
          <span className="text-sm">Zero Fuel Weight</span>
        </div>
        <div className="w1/5 p-4 flex flex-col items-center">
          <span className="text-xl mb-2">2,300 kg</span>
          <span className="text-sm">Takeoff Weight</span>
        </div>
      </div>
      <div className="rounded shadow p-2 bg-white mb-4">
        <span className="text-xl">Payload</span>
        <Cargo />
        <Pax />
      </div>
      <div className="rounded shadow p-2 bg-white mb-4">
        <span className="text-xl">Weather</span>
        <div>Departure: {depMetar}</div>
        <div>Arrival: {arrMetar}</div>
      </div>
      <FlightMap flight={pirep.flight} size="large" />
    </div>
  )
}

Dispatch.layout = page => <Layout children={page} title="Dispatch" />

export default Dispatch
