@php
    $class = $class ?? '';
    $value = $value ?? '{}';

    switch (is_array($value)) {
        case false:
            $value = json_decode($value);
            break;
    }
    $value = json_encode($value, JSON_PRETTY_PRINT);
@endphp

<div class="json-editor-field  {{ $class ?? '' }}">
    <div class="json-editor-field__tabs">
        <button class="json-editor-field__tab json-editor-field__tab-active" type="button" data-tab="json-editor-field__json">
            Json
        </button>
        <button class="json-editor-field__tab" type="button" data-tab="json-editor-field__textarea">
            String
        </button>
    </div>

    <div class="json-editor-field__body">

        <div id="json-editor-field__json" class="json-editor-field__json">
        </div>

        <div id="json-editor-field__textarea" class="json-editor-field__textarea json-editor-field__hidden">
            <textarea {{ $attributes->except(['value', 'class']) }} >{{ $value }}</textarea>
        </div>
    </div>

</div>


@push('styles')
    <link href="{{ asset('vendor/json-form/json-editor-field/css/json-editor-field.css') }}" rel="stylesheet">
@endpush

@push('scripts')
    <script src="{{ asset('vendor/json-form/json-editor-field/js/json-editor-field.js') }}"></script>
@endpush
