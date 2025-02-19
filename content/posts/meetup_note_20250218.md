+++
date = '2025-02-18T15:54:31+08:00'
draft = false
title = '2025/02/18 Meetup 筆記'
summary =  ''
authorId =  'yuchunc'
authorName = 'Mickey Chen'
readTime = true
tags = []
showTags = true
hideBackToTop = false

+++

# Interesting Find
- [PhoenixAnalytics](https://github.com/lalabuy948/PhoenixAnalytics?tab=readme-ov-file)
  Awesome looking analytics tool for your pet project.

- Success Typing vs Set Theoretic Types

  [Elixir 1.18 changelog](https://hexdocs.pm/elixir/changelog.html#type-system-improvements) around types.

  <details>
    <summary>From ChatGPT </summary>

    [**link**](https://chatgpt.com/share/67b45361-43e8-800c-b46b-06f39bb3f5fa)


    ### **Deep Dive into Set-Theoretic Types in Elixir**
    Since we’ve seen how **Elixir's current type system** (using Dialyzer) allows some incorrect types to slip through, let's now explore **how a set-theoretic type system** would work differently.

    ---

    ## **1. How Would Set-Theoretic Types Work in Elixir?**
        A **set-theoretic type system** introduces explicit operations like **union (`|`), intersection (`&`), and negation (`~`)**. These allow us to **strictly enforce** type constraints **at compile time** rather than relying on Dialyzer’s success typing.
    
    ### 🔹 **Comparison with Dialyzer**
        | Feature               | Dialyzer (Success Typing) | Set-Theoretic Types (Strict Typing) |
        |----------------------|----------------------|-------------------|
        | **Union Types (`\|`)**    | Implicit, inferred   | Explicit & enforced |
        | **Intersection Types (`&`)** | Not supported       | Fully supported |
        | **Negation Types (`~T`)**    | Not supported       | Supported (`~String`) |
        | **Compile-Time Checks**     | No (only warnings)   | Yes (strict enforcement) |
        | **Error Handling**    | Some false negatives | More precise detection |
    
    
    ## **2. Example: Strict Union Types in Set-Theoretic Typing**
        Let’s redefine the previous example **using set-theoretic types**.
    
    ### **🔸 Current Elixir (Dialyzer)**
        ```elixir
        @spec format_value(integer() | binary()) :: binary()
        def format_value(value) do
          to_string(value)
        end
        ```

        ❌ **Problem:** Dialyzer won’t stop you from passing an atom like `:world`, even though the spec only allows `integer()` or `binary()`.
    
        ---
    
    ### **🔹 How It Would Work in a Set-Theoretic Type System**
        If Elixir had **explicitly enforced union types**, the function might be written like this:
    
        ```elixir
        def format_value(value: Integer | String) -> String do
          to_string(value)
        end
        ```
    
        ✅ **Key Differences:**
        - **Explicit union (`Integer | String`)** prevents invalid inputs at **compile-time**.
        - **If you pass a `List` or an `Atom`, compilation will fail.**  
        - **No need for Dialyzer!** Type checking is built-in.
    
        ---
    
    ## **3. Intersection Types (`&`)**
        Sometimes we want a type that **must satisfy multiple conditions**. Right now, Elixir **doesn't support this**.
    
    ### **🔸 Current Elixir (No Intersection Types)**
        Imagine we have `Drawable` and `Clickable` behaviors:
    
        ```elixir
        defmodule Drawable do
          @callback draw() :: :ok
        end
    
        defmodule Clickable do
          @callback click() :: :ok
        end
        ```
    
        If we want to define a function that only accepts objects that **both** implement `Drawable` and `Clickable`, there's no **native** way to enforce this.
    
    ### **🔹 With Set-Theoretic Types (`&`)**
        ```elixir
        def handle_element(element: Drawable & Clickable) -> :ok do
          element.draw()
          element.click()
        end
        ```
    
        ✅ **Key Differences:**
        - `Drawable & Clickable` means **the argument must satisfy both interfaces.**
        - If an object **implements only `Drawable` but not `Clickable`, it’s rejected**.
        - **Stronger compile-time safety** without runtime checks.
    
        ---
    
    ## **4. Negation Types (`~T`)**
        Another powerful feature of set-theoretic types is **negation**: `~T` means “any type **except** `T`.”
    
    ### **🔸 Current Elixir (No Negation Types)**
        Imagine we have a function that **should accept any type except a string**:
    
        ```elixir
        def process_value(value) do
          case value do
            s when is_binary(s) -> raise "Strings not allowed!"
            _ -> IO.inspect(value)
          end
        end
        ```
    
        ❌ **Problem:** We have to write explicit guards (`is_binary/1`).  
        ❌ **If we forget the guard, there's no type-level protection.**
    
    ### **🔹 With Set-Theoretic Types (`~T`)**
        ```elixir
        def process_value(value: ~String) -> any do
          IO.inspect(value)
        end
        ```
    
        ✅ **Key Differences:**
        - `~String` ensures **compile-time rejection of strings**.
        - No need for **manual guards**.
        - Stronger **error prevention** at the type level.
    
        ---
    
    ## **5. Practical Implications: How Could Elixir Adopt This?**
        For Elixir to move towards **set-theoretic types**, it would require:
        1. **Replacing or Enhancing Dialyzer** – Since Dialyzer is based on success typing, a **new type checker** would be needed.
        2. **Compiler Support for Explicit Types** – Instead of type specs as comments (`@spec`), **types would be enforced at compile-time**.
        3. **Backwards Compatibility Strategy** – Since Elixir doesn’t require types today, introducing stricter types must be **gradual**.
    
        ---
    
    ## **6. Would This Be Worth It?**
        ✅ **Pros:**
        - **Better Type Safety** – More precise types prevent subtle runtime errors.
        - **No More False Negatives** – Unlike Dialyzer, which sometimes **misses errors**, strict typing **catches them at compile time**.
        - **More Expressive Code** – Explicit union, intersection, and negation types make type contracts **clearer**.
    
        ❌ **Cons:**
        - **More Rigid** – Developers who like Elixir’s **dynamic nature** might dislike stricter typing.
        - **Potentially More Boilerplate** – If types **must** be declared everywhere, it could slow down development.
    
        🚀 **José Valim’s research into set-theoretic types suggests that Elixir might move in this direction!** But it would need to balance type safety with Elixir’s dynamic flexibility.
  </details>

- Chris McCord is working on AI code generation
  - Give legacy postgres db, make suggestion of schema/dashboard/etc... 🤯 ([link](https://x.com/chris_mccord/status/1884719018507919651))
  - Weather app ([link](https://x.com/chris_mccord/status/1882889374670696903))
  
- AI Agent? 🤔

- May 15-16 [ElixirConfEu 2025](https://www.elixirconf.eu/) @ Kraków Poland & Virtual

- April 2-3 [AlchemyConf 2025](https://alchemyconf.com/) @ Braga Portugal

- [Awesome MCP Server](https://github.com/punkpeye/awesome-mcp-servers)

- [Introducing the Model Context Protocol](https://www.anthropic.com/news/model-context-protocol)

- [Windsurf](https://codeium.com/windsurf)

- [Boundary lib](https://github.com/sasa1977/boundary)

- [ElixirConf 2023 - German Velasco - Using DDD concepts to create better Phoenix Contexts](https://www.youtube.com/watch?v=JNWPsaO4PNM)
