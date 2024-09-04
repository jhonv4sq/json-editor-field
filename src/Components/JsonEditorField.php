<?php
namespace JsonForm\JsonEditorField\Components;

use Illuminate\View\Component;
use Illuminate\View\View;

class JsonEditorField extends Component
{
    public $class;
    public $value;

    public function __construct($class = null, $value = null)
    {
        $this->class = $class ?? '';
        $this->value = $value ?? '';
    }

    public function render(): View
    {
        dd('JsonInput render method called');
        return view('jsonEditorField::json-editor-field');
    }
}
