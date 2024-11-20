const obj = {
    _id: "6733bf9eeeea4dc3bf6b2cd1",
    user: "6733aba86a0842f95406dfc1",
    text: "naa avan illai",
    likes: [],
    comment: [
      {
        text: "finally i succeed",
        user: "673174fc63cfb98fcd1a319a",
        _id: "6733c4ca60ce4d2badb01e38"
      },
      {
        text: "ippa enna nadukkudhu",
        user: "673174fc63cfb98fcd1a319a",
        _id: "6733c5740ad497f0645a80a4"
      },
      {
        text: "comment complted",
        user: "673174fc63cfb98fcd1a319a",
        _id: "6733c60582533dcb29db2faa"
      }
    ],
    createdAt: "2024-11-12T20:50:38.009Z",
    updatedAt: "2024-11-17T20:51:56.820Z",
    __v: 2
  }


  const likes=obj.likes.push("testing")

  console.log(obj);

  const newobj=obj.likes.filter(s=>s!=="testing")

  obj.likes=[...newobj]

  console.log(obj);
  
  
  