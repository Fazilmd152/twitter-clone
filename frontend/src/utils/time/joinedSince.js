function getJoinedSince(createdAt) {
    const date = new Date(createdAt);
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return `Joined since ${monthNames[date.getMonth()]} ${date.getFullYear()}`;
  }
  

  export default getJoinedSince