<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Str;

class Highlight extends Model
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
        'highlightIMG',
        'highlightTitle',
        'highlightDescription',
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
}
