<div class="p-6 flex-grow flex flex-col">
  <h1 class="text-xl mb-2">Foreign Key</h1>

  <div class="grid grid-cols-12 gap-8 flex-grow">
    <div class="col-span-5">
      <div class="mb-2">
        <p class="mb-1">Foreign Key Name</p>
        <input
          class="input-base"
          placeholder="fk_name..."
          bind:value={table.fk_name}
        />
      </div>

      <div class="mb-1 mt-2">
        <p class="font-semibold">Source Column</p>
      </div>

      <!-- Source -->
      <div class="p-2 space-y-2 rounded border border-gray-400 mb-2">
        <div>
          <p>Table</p>
          <select class="input-base" bind:value={table.source_table}>
            <option selected disabled value="">Table...</option>
            <option>table_1</option>
            <option>table_2</option>
          </select>
        </div>
        <div>
          <p>Column Name</p> 
          <select class="input-base" bind:value={table.source_column}>
            <option selected disabled value="">Column...</option>
            <option>column_1</option>
            <option>column_2</option>
            <option>column_3</option>
            <option>column_4</option>
          </select>
        </div>
      </div>
      
      <div class="mb-1 mt-2">
        <p class="font-semibold">Reference Column</p>
      </div>

      <!-- Reference -->
      <div class="p-2 space-y-2 rounded border border-gray-400 mb-2">
        <div>
          <p>Table</p>
          <select class="input-base" bind:value={table.reference_table}>
            <option selected disabled value="">Table...</option>
            <option>table_1</option>
            <option>table_2</option>
          </select>
        </div>
        <div>
          <p>Column Name</p> 
          <select class="input-base" bind:value={table.reference_column}>
            <option selected disabled value="">Column...</option>
            <option>column_1</option>
            <option>column_2</option>
            <option>column_3</option>
            <option>column_4</option>
          </select>
        </div>
      </div>

      <div class="mb-2">
        <p class="mb-1">On Update</p>
        <div class="flex items-center">
          <input checked
            name="onUpdate"
            type="radio"
            value="No Action"
            class="mr-2 rounded-full"
            bind:group={table.on_update}
           />
          <p class="mr-4">No Action</p>
          <input
            name="onUpdate"
            type="radio"
            value="Restrict"
            class="mr-2 rounded-full"
            bind:group={table.on_update}
           />
          <p class="mr-4">Restrict</p>
          <input
            name="onUpdate"
            type="radio"
            value="Cascade"
            class="mr-2 rounded-full"
            bind:group={table.on_update}
           />
          <p class="mr-4">Cascade</p>
          <input
            name="onUpdate"
            type="radio"
            value="Set Default"
            class="mr-2 rounded-full"
            bind:group={table.on_update}
           />
          <p class="mr-4">Set Default</p>
          <input
            name="onUpdate"
            type="radio"
            value="Set Null"
            class="mr-2 rounded-full"
            bind:group={table.on_update}
           />
          <p class="mr-4">Set Null</p>
        </div>
      </div>
      <div>
        <p class="mb-1">On Delete</p>
        <div class="flex items-center">
          <input checked
            name="onDelete"
            type="radio"
            value="No Action"
            class="mr-2 rounded-full"
            bind:group={table.on_delete}
          />
          <p class="mr-4">No Action</p>
          <input
            name="onDelete"
            type="radio"
            value="Restrict"
            class="mr-2 rounded-full"
            bind:group={table.on_delete}
          />
          <p class="mr-4">Restrict</p>
          <input
            name="onDelete"
            type="radio"
            value="Cascade"
            class="mr-2 rounded-full"
            bind:group={table.on_delete}
          />
          <p class="mr-4">Cascade</p>
          <input
            name="onDelete"
            type="radio"
            value="Set Default"
            class="mr-2 rounded-full"
            bind:group={table.on_delete}
          />
          <p class="mr-4">Set Default</p>
          <input
            name="onDelete"
            type="radio"
            value="Set Null"
            class="mr-2 rounded-full"
            bind:group={table.on_delete}
          />
          <p class="mr-4">Set Null</p>
        </div>
      </div>

      <div>
        <button
          class="btn-default text-sm text-red-700 mt-3"
          on:click={generateForeignSql}>Generate(Foreign Key)</button>
      </div>
    </div>

    <div class="grow p-5 bg-pink-50 col-span-7">
      {#if foreignSql !== ''}
        <div class="text-lg mb-5d">
          <p>Foreign Key:</p>
          {foreignSql}
        </div>
      {/if}
    </div>
  </div>
</div>

<script>
  let foreignSql = '';
  let table = {
    fk_name: '',
    source_table: '',
    source_column: '',
    reference_table: '',
    reference_column: '',
    on_update: '',
    on_delete: ''
  };

  function generateForeignSql() {
    foreignSql = '';
    if (
      !table.fk_name ||
      !table.source_table ||
      !table.source_column ||
      !table.reference_table ||
      !table.reference_column
    ) {
      alert('Please fill all inputs.');
      return;
    }

    foreignSql += `ALTER TABLE ${table.source_table} ADD CONSTRAINT ${table.fk_name} FOREIGN KEY (${table.source_column}) REFERENCES ${table.reference_table} (${table.reference_column})${table.on_update !== '' ? ' ON UPDATE ' + table.on_update : ''}${table.on_delete !== '' ? ' ON DELETE ' + table.on_delete : ''};`;
  }
</script>