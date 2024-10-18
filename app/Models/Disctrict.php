<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Str;

class District extends Model
{
    use HasFactory;

    /**
     * Indicates if the IDs are auto-incrementing.
     *
     * @var bool
     */
    public $incrementing = false;

    /**
     * The "type" of the auto-incrementing ID.
     *
     * @var string
     */
    protected $keyType = 'uuid';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'userID',
        'highlightID',
        'heroIMG',
        'districtName',
        'districtDescription',
        'location',
    ];

    /**
     * The "booted" method of the model.
     */
    protected static function booted()
    {
        parent::booted();

        // Automatically assign a UUID when creating a new model
        static::creating(function ($model) {
            $model->id = (string) Str::uuid();
        });
    }

    /**
     * Get the user that owns the district.
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'userID');
    }

    /**
     * Get the highlight that the district belongs to.
     */
    public function highlight()
    {
        return $this->belongsTo(Highlight::class, 'highlightID');
    }
}
