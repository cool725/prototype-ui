<div transition:fade>
  <select class="input-base mb-2" bind:value={objAttributes.where_clause}>
    <option disabled selected value="">Construct...</option>
    <option value="AND">AND</option>
    <option value="OR">OR</option>
    <option value="BETWEEN">BETWEEN</option>
    <option value="NOT BETWEEN">NOT BETWEEN</option>
  </select>

  <div class="p-2 space-y-2 rounded border border-gray-400 mb-2">
    <div class="grid grid-cols-2 gap-2">
      <div>
        <p>Column</p>
        <select class="input-base" bind:value={objAttributes.column_name}>
          <option selected disabled value="">Column...</option>
          <option>column_1</option>
          <option>column_2</option>
        </select>
      </div>
      <div>
        <p>Operator</p>
        <select class="input-base" bind:value={objAttributes.operator}>
          <option selected disabled value="">Operator...</option>
          <option value="=">= (Equal To)</option>
          <option value="!=">!= (Not Equal To)</option>
          <option value="<">&lt; Less Than</option>
          <option value=">">&gt; (Greater Than)</option>
          <option value="<=">&lt;=  (Less or Equal To)</option>
          <option value=">=">&gt;=  (Greater or Equal To)</option>
          <option value="LIKE">LIKE</option>
          <option value="NOT LIKE">NOT LIKE</option>
        </select>
      </div>
    </div>
    <div>
      <p>Value</p>
      <input class="input-base" placeholder="Value..." bind:value={objAttributes.value} />
    </div>
    <div class="flex items-center mt-2">
      <button
        class="ml-auto btn-default text-sm text-red-700"
        on:click={removeComponent}
      >Remove Column</button>
    </div>
  </div>
</div>

<script>
  export let objAttributes = {};
  import { fade } from 'svelte/transition';
  import { storeColumnsForSelect } from '../store.js';

  function removeComponent() {
    $storeColumnsForSelect = $storeColumnsForSelect.filter(function(value, index, arr){ 
      if (value.id != objAttributes.id) return value;
    });
    console.log($storeColumnsForSelect)
  }
</script>