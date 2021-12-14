<div class="p-6 flex-grow flex flex-col" transition:fade>
  <h1 class="text-xl mb-2">Select Table</h1>

  <div class="grid grid-cols-12 gap-8 flex-grow">
    <div class="col-span-5">
      <div class="mb-2">
        <p class="mb-1">Table</p>
        <select class="input-base" bind:value={table.table_name}>
          <option selected disabled value="">Table...</option>
          <option>table_1</option>
          <option>table_2</option>
        </select>
      </div>

      <div class="p-2 space-y-2 rounded border border-gray-400 mb-2">
        <div class="flex tems-center">
          <p class="font-bold">Select Columns</p>
          <p
            class="ml-auto cursor-pointer text-blue-600"
            on:click={handleSelectedStatus}
          >
          {!isSelectAllColumns ? 'Select' : 'Unselect'} All</p>
        </div>

        {#each columns as column}
          <div class="flex items-center">
            <input type="checkbox" class="mr-2 rounded" bind:group={table.selected} value={column} />
            <p selected>{column}</p>  
          </div>
        {/each}
      </div>

      <div class="mb-1 mt-2">
        <p class="font-semibold">Where</p>
      </div>

      <!-- Where Card -->
      <div class="p-2 space-y-2 rounded border border-gray-400 mb-2">
        <div class="grid grid-cols-2 gap-2">
          <div>
            <p>Column</p>
            <select class="input-base" bind:value={whereClause.column_name}>
              <option value="" selected disabled>Column...</option>
              <option>column_1</option>
              <option>column_2</option>
            </select>
          </div>

          <div>
            <p>Operator</p>
            <select class="input-base" bind:value={whereClause.operator}>
              <option value="" selected disabled>Operator...</option>
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

        <!-- Custom data type - added if other type selected above -->
        <div>
          <p>Value</p>
          <input class="input-base" placeholder="Value..." bind:value={whereClause.value} />
        </div>
        <!-- <div class="flex items-center mt-2">
          <button class="ml-auto btn-default text-sm text-red-700">Remove Column</button>
        </div> -->
      </div>

      <div class="columns">
        {#each $storeColumnsForSelect as column}
          <WhereCard objAttributes={column} />
        {/each}
      </div>

      <!-- Add Clause -->
      <div class="mb-3">
        <button class="btn-default text-sm" on:click={addColumn}>Add Where Clause</button>
      </div>
      <!-- Primary Keys -->
      <div class="p-2 space-y-2 rounded border border-gray-400 mb-2">
        <p class="font-bold">Group By</p>
        <div class="flex items-center">
          <input
            type="checkbox"
            class="mr-2 rounded"
            value="Column_1"
            on:change={(e) => addSelectedColumn('groupBy', e)}
          />
          <p class="">Column_1</p>  
        </div>

        <div class="flex items-center">
          <input
            type="checkbox"
            class="mr-2 rounded"
            value="Column_2"
            on:change={(e) => addSelectedColumn('groupBy', e)}
          />
          <p class="">Column_2</p>  
        </div>
      </div>

      <!-- Order By -->
      <div class="p-2 space-y-2 rounded border border-gray-400 mb-2">
        <p class="font-bold">Order By</p>
        <div class="flex items-center">
          <input
            type="checkbox"
            class="mr-2 rounded"
            value="Column_1"
            on:change={(e) => addSelectedColumn('orderBy', e)}
          />
          <p class="">Column_1</p>  
        </div>

        <div class="flex items-center">
          <input
            type="checkbox"
            class="mr-2 rounded"
            value="Column_2"
            on:change={(e) => addSelectedColumn('orderBy', e)}
          />
          <p class="">Column_2</p>  
        </div>
      </div>

      <div class="mb-2">
        <p>Limit Rows</p>
        <input
          class="input-base"
          placeholder="Limit By..."
          bind:value={table.limit}
        />
      </div>

      <div>
        <button
          class="btn-default text-sm text-red-700"
          on:click={generateSelectSql}>Generate(Select)</button>
      </div>
    </div>

    <div class="grow p-5 bg-pink-50 col-span-7">
      {#if selectSql !== ''}
        <div class="text-lg mb-5d">
          <p>Select Sql:</p>
          {selectSql}
        </div>
      {/if}
    </div>
  </div>
</div>

<script>
  import WhereCard from './WhereCard.svelte';
  import { fade } from 'svelte/transition';

  import { storeColumnsForSelect, idIncrementForSelect } from '../store.js';
  let whereClause = {
    column_name: '',
    operator: '',
    value: ''
  };

  let columns = ['Column_1', 'Column_2'];

  $storeColumnsForSelect = [
    // other items can go here
  ];

  idIncrementForSelect.set(1);

  let table = {
    table_name: '',
    selected: [],
    groupBy: [],
    orderBy: [],
    limit: '250'
  };

  let selectSql = '';
  let isSelectAllColumns = false;

  function handleSelectedStatus() {
    isSelectAllColumns = !isSelectAllColumns;
    if (isSelectAllColumns) {
      // current static columns
      table['selected'] = columns;
    } else {
      table['selected'] = [];
    }
  }

  function addSelectedColumn(type, e) {
    if (e.target.checked) {
      table[type] = [...table[type], e.target.value]
    } else {
      const columnIndex = table[type].findIndex((column) => e.target.value === column);
      table[type].splice(columnIndex, 1);
    }
  }

  function addColumn() {
    var l = $storeColumnsForSelect.length;  // get our current items list count
    $storeColumnsForSelect[l] = {
      id:$idIncrementForSelect,
      where_clause: '',
      column_name: '',
      operator: '',
      value: ''
    };
  
    $idIncrementForSelect++; // increment our id to add additional items
  }

  function generateSelectSql() {
    selectSql = '';
    table['columns'] = $storeColumnsForSelect;

    if (table.table_name === '') {
      alert('Please select the table name.');
      return;
    }

    if (table['selected'].length === 0) {
      alert('Please select the column names.');
      return;
    }

    const selected = table['selected'].length === columns.length ? '*' : table['selected'].join(', ');

    selectSql += `SELECT ${selected} FROM ${table['table_name']}`;

    if (whereClause['column_name'] !== '' && whereClause['operator'] === '') {
      alert('Please select the operator.');
      return; 
    }

    if (whereClause['column_name'] !== '') {
      selectSql += ` WHERE ${whereClause['column_name']} ${whereClause['operator']} '${whereClause['value']}'`;
    }

    if (whereClause['column_name'] === '' && table['columns'].length > 0) {
      table['columns'].forEach(column => {
        if (column.operator === '') {
          alert('Please select the operator.');
          return;      
        }

        selectSql += ` WHERE 1 ${column.where_clause} ${column.column_name} ${column.operator} '${column.value}'`;
      });
    }

    if (whereClause['column_name'] !== '' && table['columns'].length > 0) {
      table['columns'].forEach(column => {
        if (column.operator === '') {
          alert('Please select the operator.');
          return;      
        }

        selectSql += ` ${column.where_clause} ${column.column_name} ${column.operator} '${column.value}'`;
      });
    }

    const groupBy = table['groupBy'].join(', ');
    if (table['groupBy'].length > 0) {
      selectSql += ` GROUP BY ${groupBy}`;
    }

    const orderBy = table['orderBy'].join(', ');
    if (table['orderBy'].length > 0) {
      selectSql += ` ORDER BY ${orderBy}`;
    }

    if (table['limit'] !== '') {
      selectSql += ` LIMIT ${table['limit']}`
    }

    selectSql += ';';
  }
</script>