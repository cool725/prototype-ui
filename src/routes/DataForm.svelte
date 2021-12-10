<main>
    <div class="p-6 border border-gray-300 flex items-center">
        <button on:click={() => (formType = 'createTable')} class="btn-default mr-2">Create / Alter Table</button>
        <button on:click={() => (formType = 'selectTable')} class="btn-default mr-2">Select Table</button>
        <button on:click={() => (formType = 'foreignKey')} class="btn-default mr-2">Foreign Key</button>
    </div>

    {#if formType === 'createTable'}
        <div class="p-6">
            <h1 class="text-xl mb-2">Create / Alter Table</h1>
            <div class="max-w-xl">
                <div class="mb-2">
                    <p>Table Name</p>
                    <input class="input-base" placeholder="Table Name..." />
                </div>
                <div class="mb-1 mt-2">
                    <p class="font-semibold">Columns</p>
                </div>

                <!-- Column Card -->
                <div class="p-2 space-y-2 rounded border border-gray-400 mb-2">
                    <div>
                        <p>Column Name</p> 
                        <input class="input-base" placeholder="column_name..." />
                    </div>
                    <div class="grid grid-cols-2 gap-2">
                        <div>
                            <p>Data Type</p>
                            <select class="input-base">
                                <option selected disabled>Data Type...</option>
                                <option>text</option>
                                <option>int</option>
                                <option>boolean</option>
                                <option>date</option>
                                <option>float8</option>
                                <option>serial</option>
                                <option>time</option>
                                <option>timestamp</option>
                                <option>timez</option>
                                <option>timestampz</option>
                                <option>uuid</option>
                                <option selected>Other Type...</option>
                            </select>
                        </div>
                        <div>
                            <p>Default Value</p>
                            <input class="input-base" placeholder="column_name..." />
                        </div>
                    </div>
                    <!-- Custom data type - added if other type selected above -->
                    <div class="p-2 rounded border border-gray-400 shadow mb-2">
                        <p>Other Data Type</p>
                        <input class="input-base" placeholder="column_name..." />
                    </div>
                    <div class="flex items-center mt-2">
                        <input type="checkbox" class="mr-2 rounded" />
                        <p class="mr-4">Nullable</p>
                        <input type="checkbox" class="mr-2 rounded" />
                        <p class="mr-4">Unique</p>
                        <button class="ml-auto btn-default text-sm text-red-700">Remove Column</button>
                    </div>
                </div>

                <!-- Another Column Card -->
                <div class="p-2 space-y-2 rounded border border-gray-400 mb-2">
                    <div>
                        <p>Column Name</p> 
                        <input class="input-base" placeholder="column_name..." />
                    </div>
                    <div class="grid grid-cols-2 gap-2">
                        <div>
                            <p>Data Type</p>
                            <select class="input-base">
                                <option selected disabled>Data Type...</option>
                                <option>text</option>
                                <option>int</option>
                                <option>boolean</option>
                                <option>date</option>
                                <option>float8</option>
                                <option>serial</option>
                                <option>time</option>
                                <option>timestamp</option>
                                <option>timez</option>
                                <option>timestampz</option>
                                <option>uuid</option>
                                <option>Other Type...</option>
                            </select>
                        </div>
                        <div>
                            <p>Default Value</p>
                            <input class="input-base" placeholder="column_name..." />
                        </div>
                    </div>
                    <div class="flex items-center mt-2">
                        <input type="checkbox" class="mr-2 rounded" />
                        <p class="mr-4">Nullable</p>
                        <input type="checkbox" class="mr-2 rounded" />
                        <p class="mr-4">Unique</p>
                        <button class="ml-auto btn-default text-sm text-red-700">Remove Column</button>
                    </div>
                </div>
                <!-- Add Column -->
                <div class="mb-3">
                    <button class="btn-default text-sm">Add Column</button>
                </div>
                <!-- Primary Keys -->
                <div class="p-2 space-y-2 rounded border border-gray-400 mb-2">
                    <p class="font-bold">Primary Keys</p>
                    <div class="flex items-center">
                        <input type="checkbox" class="mr-2 rounded" />
                        <p class="">Column 1</p>    
                    </div>
                    <div class="flex items-center">
                        <input type="checkbox" class="mr-2 rounded" />
                        <p class="">Column 2</p>    
                    </div>
                </div>
            </div>
        </div>
    {/if}

    {#if formType === 'selectTable'}
        <div class="p-6">
            <h1 class="text-xl mb-2">Select Table</h1>
            <div class="max-w-xl">
                <div class="mb-2">
                    <p>Table</p>
                    <select class="input-base">
                        <option selected disabled>Table...</option>
                        <option>table_1</option>
                        <option>table_2</option>
                    </select>
                </div>

                <div class="p-2 space-y-2 rounded border border-gray-400 mb-2">
                    <div class="flex tems-center">
                        <p class="font-bold">Select Columns</p>
                        <p class="ml-auto cursor-pointer text-blue-600">Select All</p>
                    </div>
                    <div class="flex items-center">
                        <input type="checkbox" class="mr-2 rounded" />
                        <p selected>Column 1</p>    
                    </div>
                    <div class="flex items-center">
                        <input type="checkbox" class="mr-2 rounded" />
                        <p selected>Column 2</p>    
                    </div>
                </div>

                <div class="mb-1 mt-2">
                    <p class="font-semibold">Where</p>
                </div>

                <!-- Where Card -->
                <div class="p-2 space-y-2 rounded border border-gray-400 mb-2">
                    <div class="grid grid-cols-2 gap-2">
                        <div>
                            <p>Column</p>
                            <select class="input-base">
                                <option selected disabled>Column...</option>
                                <option>column_1</option>
                                <option>column_2</option>
                            </select>
                        </div>
                        <div>
                            <p>Operator</p>
                            <select class="input-base">
                                <option selected disabled>Operator...</option>
                                <option>= (Equal To)</option>
                                <option>!= (Not Equal To)</option>
                                <option>&lt; Less Than</option>
                                <option>&gt; (Greater Than)</option>
                                <option>&lt;=	 (Less or Equal To)</option>
                                <option>&gt;=	 (Greater or Equal To)</option>
                                <option>LIKE</option>
                                <option>NOT LIKE</option>
                            </select>
                        </div>
                    </div>
                    <!-- Custom data type - added if other type selected above -->
                    <div>
                        <p>Value</p>
                        <input class="input-base" placeholder="Value..." />
                    </div>
                    <div class="flex items-center mt-2">
                        <button class="ml-auto btn-default text-sm text-red-700">Remove Column</button>
                    </div>
                </div>

                <select class="input-base mb-2">
                    <option disabled>Construct...</option>
                    <option selected>AND</option>
                    <option>OR</option>
                    <option>BETWEEN</option>
                    <option>NOT BETWEEN</option>
                </select>

                <div class="p-2 space-y-2 rounded border border-gray-400 mb-2">
                    <div class="grid grid-cols-2 gap-2">
                        <div>
                            <p>Column</p>
                            <select class="input-base">
                                <option selected disabled>Column...</option>
                                <option>column_1</option>
                                <option>column_2</option>
                            </select>
                        </div>
                        <div>
                            <p>Operator</p>
                            <select class="input-base">
                                <option selected disabled>Operator...</option>
                                <option>= (Equal To)</option>
                                <option>!= (Not Equal To)</option>
                                <option>&lt; Less Than</option>
                                <option>&gt; (Greater Than)</option>
                                <option>&lt;=	 (Less or Equal To)</option>
                                <option>&gt;=	 (Greater or Equal To)</option>
                                <option>LIKE</option>
                                <option>NOT LIKE</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <p>Value</p>
                        <input class="input-base" placeholder="Value..." />
                    </div>
                    <div class="flex items-center mt-2">
                        <button class="ml-auto btn-default text-sm text-red-700">Remove Column</button>
                    </div>
                </div>

                <!-- Add Clause -->
                <div class="mb-3">
                    <button class="btn-default text-sm">Add Where Clause</button>
                </div>
                <!-- Primary Keys -->
                <div class="p-2 space-y-2 rounded border border-gray-400 mb-2">
                    <p class="font-bold">Group By</p>
                    <div class="flex items-center">
                        <input type="checkbox" class="mr-2 rounded" />
                        <p class="">Column 1</p>    
                    </div>
                    <div class="flex items-center">
                        <input type="checkbox" class="mr-2 rounded" />
                        <p class="">Column 2</p>    
                    </div>
                </div>
                <!-- Order By -->
                <div class="p-2 space-y-2 rounded border border-gray-400 mb-2">
                    <p class="font-bold">Order By</p>
                    <div class="flex items-center">
                        <input type="checkbox" class="mr-2 rounded" />
                        <p class="">Column 1</p>    
                    </div>
                    <div class="flex items-center">
                        <input type="checkbox" class="mr-2 rounded" />
                        <p class="">Column 2</p>    
                    </div>
                </div>
                <div class="mb-2">
                    <p>Limit Rows</p>
                    <input class="input-base" placeholder="Limit By..." />
                </div>
            </div>
        </div>
    {/if}

    {#if formType === 'foreignKey'}
        <div class="p-6">
            <h1 class="text-xl mb-2">Foreign Key</h1>
            <div class="max-w-xl">
                <div class="mb-2">
                    <p>Foreign Key Name</p>
                    <input class="input-base" placeholder="fk_name..." />
                </div>

                <div class="mb-1 mt-2">
                    <p class="font-semibold">Source Column</p>
                </div>

                <!-- Source -->
                <div class="p-2 space-y-2 rounded border border-gray-400 mb-2">
                    <div>
                        <p>Table</p>
                        <select class="input-base">
                            <option selected disabled>Table...</option>
                            <option>table_1</option>
                            <option>table_2</option>
                        </select>
                    </div>
                    <div>
                        <p>Column Name</p> 
                        <select class="input-base">
                            <option selected disabled>Column...</option>
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
                        <select class="input-base">
                            <option selected disabled>Table...</option>
                            <option>table_1</option>
                            <option>table_2</option>
                        </select>
                    </div>
                    <div>
                        <p>Column Name</p> 
                        <select class="input-base">
                            <option selected disabled>Column...</option>
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
                        <input checked name="onUpdate" type="radio" class="mr-2 rounded-full" />
                        <p class="mr-4">No Action</p>
                        <input name="onUpdate" type="radio" class="mr-2 rounded-full" />
                        <p class="mr-4">Restrict</p>  
                        <input name="onUpdate" type="radio" class="mr-2 rounded-full" />
                        <p class="mr-4">Cascade</p>    
                        <input name="onUpdate" type="radio" class="mr-2 rounded-full" />
                        <p class="mr-4">Set Default</p>    
                        <input name="onUpdate" type="radio" class="mr-2 rounded-full" />
                        <p class="mr-4">Set Null</p>    
                    </div>
                </div>
                <div>
                    <p class="mb-1">On Delete</p>
                    <div class="flex items-center">
                        <input checked name="onDelete" type="radio" class="mr-2 rounded-full" />
                        <p class="mr-4">No Action</p>
                        <input name="onDelete" type="radio" class="mr-2 rounded-full" />
                        <p class="mr-4">Restrict</p>  
                        <input name="onDelete" type="radio" class="mr-2 rounded-full" />
                        <p class="mr-4">Cascade</p>    
                        <input name="onDelete" type="radio" class="mr-2 rounded-full" />
                        <p class="mr-4">Set Default</p>    
                        <input name="onDelete" type="radio" class="mr-2 rounded-full" />
                        <p class="mr-4">Set Null</p>    
                    </div>
                </div>
            </div>
        </div>
    {/if}
</main>

<script>
    let formType = 'createTable'
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
</script>