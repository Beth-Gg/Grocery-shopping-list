let url = new URL("http://127.0.0.1:3000/users/lists/659fdcb40bf00358b436e240/");
let result = await createLists(userId, content, date);
result = await result.json();