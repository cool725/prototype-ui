<script>
	import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import { getIntrospectionQuery, buildClientSchema } from 'graphql';

  //Icons
  import Icon from 'svelte-icons-pack/Icon.svelte'
  import BiSolidMagicWand from 'svelte-icons-pack/bi/BiSolidMagicWand'
  import BiPlusCircle from 'svelte-icons-pack/bi/BiPlusCircle'
  import BiPlayCircle from 'svelte-icons-pack/bi/BiPlayCircle'
  import BiSearch from 'svelte-icons-pack/bi/BiSearch'
  import BiFilterAlt from 'svelte-icons-pack/bi/BiFilterAlt'
  import BiTrash from 'svelte-icons-pack/bi/BiTrash'
  import BiRightArrowAlt from 'svelte-icons-pack/bi/BiRightArrowAlt'
  import BiShow from 'svelte-icons-pack/bi/BiShow'
  import BiHide from 'svelte-icons-pack/bi/BiHide'
  import BiEditAlt from 'svelte-icons-pack/bi/BiEditAlt'

  //Schema
  let clientSchema
  let introspection

	onMount(async () => {
    // Introspection Query  
    const urlBase = import.meta.env.VITE_GQL_BASEURL;
    const adminSecret = import.meta.env.VITE_HASURA_ADMIN_SECRET;

    const gqlURL = urlBase + '/v1/graphql'
    const introspectionRes = await fetch(gqlURL, {
      method: "POST",
      body: JSON.stringify({ 'query': getIntrospectionQuery()}),
      headers: {
        "x-hasura-admin-secret" : adminSecret,
        "x-hasura-role" : "admin",    
      }
    });
    introspection = await introspectionRes.json();
    clientSchema = buildClientSchema(introspection.data);

    console.log(introspection)
    console.log(clientSchema)
  });

  // Dummy Data
  let queryContent = `query MyQuery($where: _groupagg_article_bool_exp = {rating: {_gte: 2}, _and: {id: {_gte: 1}, author_id: {_gte: 1}}}) {
    _groupagg_article(limit: 250, distinct_on: author_id, where: $where) {
      author_id
      id
      rating
      title
      author {
        id
        name
      }
    }
  }`
  let variableContent = `{"where": {"rating": {"_gte": 2}, "_and": {"id": {"_gte": 1}, "author_id": {"_gte": 1}}}}"}`
</script>

<div class="max-w-4xl">
  <div class="p-6 pb-8">
    <!-- Query Composer -->

    <!-- Select type -->
    <div class="flex">
      <div class="mb-4 w-full">
        <p class="text-xs font-semibold tracking-wider uppercase mb-1">Select Type</p>
        <select value="limit" class="block w-full h-8 px-2 py-0 mb-2 border border-gray-400 rounded shadow-sm hover:border-gray-500 focus:outline-0 focus:ring-2 focus:ring-blue-200 focus:border-blue-600">
          <option disabled>Argument...</option>
          <option disabled>Queries</option>
          <option>continent</option>
          <option>continents</option>
          <option>...</option>
          <option disabled>Mutations</option>
          <option>delete__groupagg_article</option>
          <option>delete__groupagg_article_by_pk</option>
          <option>...</option>
          <option disabled>Subscriptions</option>
          <option>continent</option>
          <option>continents</option>
          <option>...</option>
        </select>
      </div>
    </div>

    <!-- First entry -->
    <div class="flex">
      <div class="w-full pt-3 pb-6">
        <div class="flex items-center mb-1">
          <p class="text-xs font-semibold tracking-wider uppercase">Argument</p>
          <input id="arg-1" type="checkbox" class="ml-auto rounded mr-1"/>
          <label for="arg-1" class="mr-3 text-sm font-semibold">Variable</label>
          <button class="flex items-center text-red-800 text-sm font-semibold"><Icon size="14" className="fill-current" src={BiTrash} /> Remove</button>
        </div>
        <select value="limit" class="block w-full h-8 px-2 py-0 mb-2 border border-gray-400 rounded shadow-sm hover:border-gray-500 focus:outline-0 focus:ring-2 focus:ring-blue-200 focus:border-blue-600">
          <option disabled>Argument...</option>
          <option>distinct_on</option>
          <option>limit</option>
          <option>offset</option>
          <option>order_by</option>
          <option>where</option>
        </select>
        <div class="relative space-y-3 z-20 border border-gray-400 bg-white rounded p-3">
          <div>
            <p class="mb-1 text-xs font-semibold tracking-wider uppercase">Input</p>
            <input value="250" placeholder="value..." class="block w-full h-8 px-2 py-0 border border-gray-400 rounded shadow-sm hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-600" />
          </div>
        </div>
        <div class="relative z-10 border border-gray-400 rounded p-3 -mt-6"></div>
        <div class="relative z-10 border border-gray-400 rounded p-3 -mt-6"></div>
        <div class="relative z-10 border border-gray-400 rounded p-3 -mt-6"></div>
      </div>
    </div>

    <!-- Second entry -->
    <div class="flex">
      <div class="w-full pt-3 pb-6">
        <div class="flex items-center mb-1">
          <p class="text-xs font-semibold tracking-wider uppercase">Argument</p>
          <input id="arg-2" type="checkbox" class="ml-auto rounded mr-1"/>
          <label for="arg-2" class="mr-3 text-sm font-semibold">Variable</label>
          <button class="flex items-center text-red-800 text-sm font-semibold"><Icon size="14" className="fill-current" src={BiTrash} /> Remove</button>
        </div>
        <select value="distinct_on" class="block w-full h-8 px-2 py-0 mb-2 border border-gray-400 rounded shadow-sm hover:border-gray-500 focus:outline-0 focus:ring-2 focus:ring-blue-200 focus:border-blue-600">
          <option disabled>Argument...</option>
          <option>distinct_on</option>
          <option>limit</option>
          <option>offset</option>
          <option>order_by</option>
          <option>where</option>
        </select>
        <div class="relative space-y-3 z-20 border border-gray-400 bg-white rounded p-3">
          <div>
            <p class="mb-1 text-xs font-semibold tracking-wider uppercase">Input</p>
            <select value="author_id" class="block w-full h-8 px-2 py-0 border border-gray-400 rounded shadow-sm hover:border-gray-500 focus:outline-0 focus:ring-2 focus:ring-blue-200 focus:border-blue-600">
              <option disabled>Select...</option>
              <option>author_id</option>
              <option>id</option>
              <option>rating</option>
              <option>title</option>
            </select>
          </div>   
        </div>
        <div class="relative z-10 border border-gray-400 rounded p-3 -mt-6"></div>
        <div class="relative z-10 border border-gray-400 rounded p-3 -mt-6"></div>
        <div class="relative z-10 border border-gray-400 rounded p-3 -mt-6"></div>
      </div>
    </div>

    <!-- Nested where entry -->
    <div class="flex">
      <div class="w-full pt-3 pb-6">
        <div class="flex items-center mb-1">
          <p class="text-xs font-semibold tracking-wider uppercase">Argument</p>
          <input id="arg-3" type="checkbox" class="ml-auto rounded mr-1" checked />
          <label for="arg-3" class="mr-3 text-sm font-semibold">Variable</label>
          <button class="flex items-center text-red-800 text-sm font-semibold"><Icon size="14" className="fill-current" src={BiTrash} /> Remove</button>
        </div>
        <select value="where" class="block w-full h-8 px-2 py-0 mb-2 border border-gray-400 rounded shadow-sm hover:border-gray-500 focus:outline-0 focus:ring-2 focus:ring-blue-200 focus:border-blue-600">
          <option disabled>Argument...</option>
          <option>distinct_on</option>
          <option>limit</option>
          <option>offset</option>
          <option>order_by</option>
          <option>where</option>
        </select>
        <div class="relative space-y-3 z-20 border border-gray-400 bg-white rounded p-3">
          <div>
            <p class="mb-1 text-xs font-semibold tracking-wider uppercase">Field</p>
            <select value="rating" class="block w-full h-8 px-2 py-0 border border-gray-400 rounded shadow-sm hover:border-gray-500 focus:outline-0 focus:ring-2 focus:ring-blue-200 focus:border-blue-600">
              <option disabled>Field...</option>
              <option>_and</option>
              <option>_not</option>
              <option>_or</option>
              <option>author</option>
              <option>author_id</option>
              <option>id</option>
              <option>rating</option>
              <option>title</option>        
            </select>  
          </div>
          <div>
            <p class="mb-1 text-xs font-semibold tracking-wider uppercase">Field</p>
            <select value="_gte" class="block w-full h-8 px-2 py-0 border border-gray-400 rounded shadow-sm hover:border-gray-500 focus:outline-0 focus:ring-2 focus:ring-blue-200 focus:border-blue-600">
              <option disabled>Field...</option>
              <option>_eq</option>
              <option>_gt</option>
              <option>_gte</option>
              <option>_in</option>
              <option>_is_null</option>
              <option>_lt</option>
              <option>_lte</option>
              <option>_neq</option>
              <option>_nin</option>        
            </select>  
          </div>
          <div>
            <p class="mb-1 text-xs font-semibold tracking-wider uppercase">Input</p>
            <input value="2" placeholder="value..." class="block w-full h-8 px-2 py-0 border border-gray-400 rounded shadow-sm hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-600" />
          </div>

          <!-- Nested _and node first layer -->
          <div class="bg-white space-y-3 border border-l-2 border-gray-300 rounded shadow-lg border-l-blue-600 p-3">
            <div>
              <div class="flex items-center mb-1">
                <p class="text-xs font-semibold tracking-wider uppercase">Field</p>
                <button class="ml-auto flex items-center text-red-800 text-sm font-semibold"><Icon size="14" className="fill-current" src={BiTrash} /> Remove</button>
              </div>  
              <select value="_and" class="block w-full h-8 px-2 py-0 border border-gray-400 rounded shadow-sm hover:border-gray-500 focus:outline-0 focus:ring-2 focus:ring-blue-200 focus:border-blue-600">
                <option disabled>Field...</option>
                <option>_and</option>
                <option>_not</option>
                <option>_or</option>
                <option>author</option>
                <option>author_id</option>
                <option>id</option>
                <option>rating</option>
                <option>title</option>        
              </select>  
            </div>
            <div>
              <p class="mb-1 text-xs font-semibold tracking-wider uppercase">Field</p>
              <select value="id" class="block w-full h-8 px-2 py-0 border border-gray-400 rounded shadow-sm hover:border-gray-500 focus:outline-0 focus:ring-2 focus:ring-blue-200 focus:border-blue-600">
                <option disabled>Field...</option>
                <option>_and</option>
                <option>_not</option>
                <option>_or</option>
                <option>author</option>
                <option>author_id</option>
                <option>id</option>
                <option>rating</option>
                <option>title</option>        
              </select>  
            </div>
            <div>
              <p class="mb-1 text-xs font-semibold tracking-wider uppercase">Field</p>
              <select value="_gte" class="block w-full h-8 px-2 py-0 border border-gray-400 rounded shadow-sm hover:border-gray-500 focus:outline-0 focus:ring-2 focus:ring-blue-200 focus:border-blue-600">
                <option disabled>Field...</option>
                <option>_eq</option>
                <option>_gt</option>
                <option>_gte</option>
                <option>_in</option>
                <option>_is_null</option>
                <option>_lt</option>
                <option>_lte</option>
                <option>_neq</option>
                <option>_nin</option>        
              </select>  
            </div>
            <div>
              <p class="mb-1 text-xs font-semibold tracking-wider uppercase">Input</p>
              <input value="1" placeholder="value..." class="block w-full h-8 px-2 py-0 border border-gray-400 rounded shadow-sm hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-600" />
            </div>  

            <!-- Nested _and node - second layer -->
            <div class="bg-white space-y-3 border border-l-2 border-gray-300 rounded shadow-lg border-l-blue-600 p-3">
              <div>
                <div class="flex items-center mb-1">
                  <p class="text-xs font-semibold tracking-wider uppercase">Field</p>
                  <button class="ml-auto flex items-center text-red-800 text-sm font-semibold"><Icon size="14" className="fill-current" src={BiTrash} /> Remove</button>
                </div>    
                <select value="author_id" class="block w-full h-8 px-2 py-0 border border-gray-400 rounded shadow-sm hover:border-gray-500 focus:outline-0 focus:ring-2 focus:ring-blue-200 focus:border-blue-600">
                  <option disabled>Field...</option>
                  <option>_and</option>
                  <option>_not</option>
                  <option>_or</option>
                  <option>author</option>
                  <option>author_id</option>
                  <option>id</option>
                  <option>rating</option>
                  <option>title</option>        
                </select>  
              </div>
              <div>
                <p class="mb-1 text-xs font-semibold tracking-wider uppercase">Field</p>
                <select value="_gte" class="block w-full h-8 px-2 py-0 border border-gray-400 rounded shadow-sm hover:border-gray-500 focus:outline-0 focus:ring-2 focus:ring-blue-200 focus:border-blue-600">
                  <option disabled>Field...</option>
                  <option>_eq</option>
                  <option>_gt</option>
                  <option>_gte</option>
                  <option>_in</option>
                  <option>_is_null</option>
                  <option>_lt</option>
                  <option>_lte</option>
                  <option>_neq</option>
                  <option>_nin</option>        
                </select>  
              </div>
              <div>
                <p class="mb-1 text-xs font-semibold tracking-wider uppercase">Input</p>
                <input value="1" placeholder="value..." class="block w-full h-8 px-2 py-0 border border-gray-400 rounded shadow-sm hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-600" />
              </div>  
            </div>
            <button class="btn-default">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-4 h-4 fill-current mr-1"><path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4z"></path><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path></svg>
              Add Node
            </button>  
          </div>

          <button class="btn-default">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-4 h-4 fill-current mr-1"><path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4z"></path><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path></svg>
            Add Node
          </button>               
        </div>
        <div class="relative z-10 border border-gray-400 rounded p-3 -mt-6"></div>
        <div class="relative z-10 border border-gray-400 rounded p-3 -mt-6"></div>
        <div class="relative z-10 border border-gray-400 rounded p-3 -mt-6"></div>
      </div>
    </div>
    <button class="btn-default">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-4 h-4 fill-current mr-1"><path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4z"></path><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path></svg>
      Add Argument
    </button>
  </div>
</div>