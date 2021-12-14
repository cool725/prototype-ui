<div class="p-6 flex-grow flex flex-col" transition:fade>
  <div class="flex items-center w-5/12 flex-none pr-4">
    <h1 class="text-xl mb-2">Create / Alter Table</h1>
    <div class="flex items-center ml-auto border-b-2 border-gray-400">
      <input
        name="alter_table"
        type="radio"
        value="create"
        class="mr-2 rounded-full"
        bind:group={isCreate}
      />
      <p class="mr-4">CREATE</p>
      
      <input
        name="alter_table"
        type="radio"
        value="alter"
        class="mr-2 rounded-full"
        bind:group={isCreate}
      />
      <p>ALTER</p>
    </div>
  </div>
  
  <div class="grid grid-cols-12 gap-8 flex-grow">
    <div class="col-span-5">
      <div class="mb-2">
        <div class="flex items-center mb-1">
          <p>Table Name</p>
          {#if isCreate === 'alter'}
            <div class="flex items-center ml-auto border-b-2 border-gray-400">
              <input
                name="alter_table_name"
                type="radio"
                value="add"
                class="mr-2 rounded-full"
                bind:group={alterTableStatus}
              />
              <p class="mr-4">ADD</p>
              
              <input
                name="alter_table_name"
                type="radio"
                value="drop"
                class="mr-2 rounded-full"
                bind:group={alterTableStatus}
              />
              <p class="mr-4">DROP</p>
              
              <input
                name="alter_table_name"
                type="radio"
                class="mr-2 rounded-full"
                value="rename"
                bind:group={alterTableStatus}
              />
              <p>RENAME</p>
            </div>
          {/if}
        </div>

        {#if isCreate === 'create'}
          <input class="input-base" placeholder="Table Name..." bind:value={table.table_name} />

          {:else}
          <select class="input-base mb-3" bind:value={table.table_name}>
            <option selected disabled value="">Table...</option>
            <option>table_1</option>
            <option>table_2</option>
          </select>
        {/if}

        {#if isCreate === 'alter' && alterTableStatus === 'rename'}
          <p>New Table Name</p>

          <input
            class="input-base"
            placeholder="New Table Name..."
            bind:value={table.new_table_name}
          />
        {/if}
      </div>

      {#if alterTableStatus === 'add' || isCreate === 'create'}
        <div class="mb-1 mt-2">
          <p class="font-semibold">Columns</p>
        </div>

        <div class="columns">
          {#each $storeColumnsForCreate as column}
            <ColumnCard isCreate={isCreate} objAttributes={column} />
          {/each}
        </div>

      <!-- Add Column -->
      <div class="mb-3">
        <button class="btn-default text-sm" on:click={addColumn}>Add Column</button>
      </div>

      <!-- Primary Keys -->
        <div class="p-2 space-y-2 rounded border border-gray-400 mb-2">
          <p class="font-bold">Primary Keys</p>
          {#each $storeColumnsForCreate as column}
            <div class="flex items-center">
              <input
                type="checkbox"
                class="mr-2 rounded"
                on:change={(e) => setPrimaryKeys(e, column)}
              />
              <p class="">{column.column_name === '' ? 'Column Name' : column.column_name}</p>
            </div>
          {/each}
        </div>
      {/if}

      <button
        class="btn-default text-sm text-red-700 mr-2 mb-3"
        on:click={isCreate === 'create' ? generateCreateSql : generateAlterSql}
      >Generate</button>
    </div>

    <div class="grow p-5 bg-pink-50 col-span-7">
      {#if resultSql !== ''}
        <div class="text-lg mb-5d">
          <p>{isCreate === 'create' ? 'Create' : 'Alter'} Sql:</p>
          {@html resultSql}
        </div>
      {/if}
    </div>
  </div>
</div>

<script>
  import { fade } from 'svelte/transition';
  import ColumnCard from './ColumnCard.svelte';

  import { storeColumnsForCreate, idIncrementForCreate } from '../store.js';

  let isCreate = 'create';
  let alterTableStatus = 'add';

  $storeColumnsForCreate = [
    {
      id:0,
      column_name: '',
      data_type: '',
      default: '',
      is_nullable: false,
      is_unique: false,
      other: '',
      alterColumnStatus: 'add',
      new_column_name: ''
    },
    // other items can go here
  ];

  idIncrementForCreate.set(1);

  let table1 = `{
    "schema": "_onetoone",
    "table_name": "owner",
    "column_name": "id",
    "data_type": "integer",
    "default": "nextval('_onetoone.owner_id_seq'::regclass)",
    "is_nullable": "false"
  }   `
  let table2 = `{
    "schema": "_onetoone",
    "table_name": "owner",
    "column_name": "name",
    "data_type": "text",
    "default": "NULL",
    "is_nullable": "false"
  }`

  let resultSql = '';

  function addColumn() {
    var l = $storeColumnsForCreate.length;  // get our current items list count
    $storeColumnsForCreate[l] = {
      id:$idIncrementForCreate,
      column_name: '',
      data_type: '',
      default: '',
      is_nullable: false,
      is_unique: false,
      other: '',
      alterColumnStatus: 'add',
      new_column_name: ''
    };
  
    $idIncrementForCreate++; // increment our id to add additional items
  }

  let table = {
    table_name: '',
    new_table_name: ''
  };

  function setPrimaryKeys(e, column) {
    column['primary_key'] = e.target.checked;
  }

  function generateCreateSql() {
    resultSql = '';
    table['columns'] = $storeColumnsForCreate;

    if (table.table_name === '') {
      alert('Please enter the table name.');
      return;
    }

    if (Number(table['columns'].length) === 0 || table['columns'][0].column_name === '') {
      resultSql = `CREATE TABLE ${table.table_name}();`;
      return;
    }

    resultSql += `CREATE TABLE ${table.table_name}(`;

    table['columns'].forEach(column => {
      if (column.data_type === '') {
        alert('Please select data type.');
        
        return;
      }


      if (column.column_name !== '') {
        resultSql += `${column.column_name} ${column.data_type === 'other' ? column.other : column.data_type}${column.is_nullable ? '' : ' NOT NULL'}${column.primary_key ? ' PRIMARY KEY' : ''}${column.is_unique ? ' UNIQUE' : ''}${column.default !== '' ? ` DEFAULT ${column.data_type === 'boolean' ? '' : '\''}` + column.default + `${column.data_type === 'boolean' ? '' : '\''}` : ''}, `;
      }
    });

    if (resultSql.slice(-2) === ', ') {
      resultSql = resultSql.slice(0, -2);
    }

    resultSql += ');';
  }

  function generateAlterSql() {
    resultSql = '';
    table['columns'] = $storeColumnsForCreate;

    if (table.table_name === '') {
      alert('Please enter the table name.');
      return;
    }

    if (alterTableStatus === 'drop') {
      resultSql += `DROP TABLE IF EXISTS ${table.table_name};`;
      return;
    }

    if (alterTableStatus === 'rename') {
      if (table.new_table_name === '') {
        alert('Please enter the new table name.');
        return;
      }
      resultSql += `ALTER TABLE ${table.table_name} RENAME TO ${table.new_table_name};<br />`;
      return;
    }

    table['columns'].forEach(column => {
      if (column.alterColumnStatus === 'drop') {
        resultSql += `ALTER TABLE ${table.table_name} DROP COLUMN ${column.column_name};<br />`;
      }

      if (column.alterColumnStatus === 'rename') {
        resultSql += `ALTER TABLE ${table.table_name} RENAME COLUMN ${column.column_name} TO ${column.new_column_name};<br />`;
      }

      if (column.alterColumnStatus === 'add') {
        if (column.data_type === '') {
          alert('Please select data type.');
          return;
        }

        resultSql += `ALTER TABLE ${table.table_name} ADD COLUMN ${column.column_name} ${column.data_type === 'other' ? column.other : column.data_type}${column.is_nullable ? '' : ' NOT NULL'}${column.primary_key ? ' PRIMARY KEY' : ''}${column.is_unique ? ' UNIQUE' : ''}${column.default !== '' ? ' DEFAULT \'' + column.default + '\'' : ''};<br />`;
      }
    });
  }

  $: isCreate, resultSql = '';
  $: isCreate, table = {table_name: '', new_table_name: ''};
  $: isCreate, $storeColumnsForCreate = [{
      id:0,
      column_name: '',
      data_type: '',
      default: '',
      is_nullable: false,
      is_unique: false,
      other: '',
      alterColumnStatus: 'add',
      new_column_name: ''
    }];

  $: alterTableStatus, resultSql = '';
  $: alterTableStatus, table = {table_name: '', new_table_name: ''};
  $: alterTableStatus, $storeColumnsForCreate = [{
      id:0,
      column_name: '',
      data_type: '',
      default: '',
      is_nullable: false,
      is_unique: false,
      other: '',
      alterColumnStatus: 'add',
      new_column_name: ''
    }];
</script>