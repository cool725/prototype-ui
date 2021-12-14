<main class="h-full flex flex-col">
  <div class="p-6 border border-gray-300 flex items-center">
    <button on:click={() => (formType = 'createTable')} class="btn-default mr-2">Create / Alter Table</button>
    <button on:click={() => (formType = 'selectTable')} class="btn-default mr-2">Select Table</button>
    <button on:click={() => (formType = 'foreignKey')} class="btn-default mr-2">Foreign Key</button>
  </div>

  {#if formType === 'createTable'}
    <CreateTable />
  {/if}

  {#if formType === 'selectTable'}
    <SelectTable />
  {/if}

  {#if formType === 'foreignKey'}
    <ForeignKey />
  {/if}
</main>

<script>
  import CreateTable from '../components/CreateTable.svelte';
  import SelectTable from '../components/SelectTable.svelte';
  import ForeignKey from '../components/ForeignKey.svelte';

  let formType = 'createTable'

  let table1 = `{
    "schema": "_onetoone",
    "table_name": "owner",
    "column_name": "id",
    "data_type": "integer",
    "default": "nextval('_onetoone.owner_id_seq'::regclass)",
    "is_nullable": "false"
  }`
  let table2 = `{
    "schema": "_onetoone",
    "table_name": "owner",
    "column_name": "name",
    "data_type": "text",
    "default": "NULL",
    "is_nullable": "false"
  }`
</script>