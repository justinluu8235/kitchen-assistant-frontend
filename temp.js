<div class="container">

    <div class="section">
        <div class="columns" id="title-block">
            <div class="column has-text-centered">
                <h1 class="title" style={{ color: "#EBF2FA" }}>Search for Friends by Email</h1><br />
            </div>
        </div>
        <form action="/userFriends" method="POST" id="searchRecipeInput">

            <input type="text" name="query" class="search-bar" />

            <input type="submit" class="search-submit" />

        </form>


        {/* <% if(!userExists) {%>  */}
        <p style={{ color: "white" }}> "This user does not exists"</p>
        {/* <% } else if (userExists && !userAdded) {%> */}
        <p style={{ color: "white" }}>`$query Found! Currently not your friend` </p>

        <form action="/userFriends/add/<%=userSearchedId%> " method="POST">
            <input type="submit" value="Add Friend" />
        </form>

        {/* <% } else {%> */}
        <p style={{ color: "white" }}>$query Found and is already your friend </p>
        {/* <% } %> */}






    </div>
</div>