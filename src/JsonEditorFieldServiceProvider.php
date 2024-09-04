<?php
namespace JsonForm\JsonEditorField;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Blade;

class JsonEditorFieldServiceProvider extends ServiceProvider
{
    public function boot()
    {
        $this->loadViewsFrom(__DIR__.'/../src/views/components', 'jsonEditorField');
        Blade::component('jsonEditorField::json-editor-field', 'json-editor-field');

        $this->publishes([
            __DIR__.'/../src/public/css' => public_path('vendor/json-form/json-editor-field/css'),
            __DIR__.'/../src/public/js' => public_path('vendor/json-form/json-editor-field/js'),
        ], 'public');
    }
}
