<script>
  import { Router, Route } from "svelte-navigator";
  import Home from "@/routes/Home.svelte";
  import Graphql from "@/routes/Graphql.svelte";
  import DataForm from "@/routes/DataForm.svelte";
</script>

<main class="flex flex-col h-screen text-gray-900 antialiased">
  <Router primary={false}>
    <Route path="/">
      <DataForm />
    </Route>

    <Route path="/graphql">
      <Graphql />
    </Route>
    
    <Route path="/home">
      <Home />
    </Route>
  </Router>  
</main>