<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Aircraft extends Model
{
    use HasFactory;

    public function fleet()
    {
        return $this->belongsTo(Fleet::class);
    }

    public function location()
    {
        return $this->belongsTo(Airport::class, 'current_airport_id', 'identifier');
    }

    public function hub()
    {
        return $this->belongsTo(Airport::class, 'hub_id', 'identifier');
    }

    public function pireps()
    {
        return $this->hasMany(Pirep::class, 'aircraft_id', 'id')->orderBy('submitted_at', 'desc');
    }
}
