<template>
  <div class="">
        <div class="">{{users}}</div>
    <!--    <div class="">{{user}}</div>-->
    <button @click="callSomeT">hello</button>
  </div>
</template>

<script>
import gql from 'graphql-tag'

export default {
  name: "Test",
  data() {
    return {
      neededId: "333",
    }
  },
  apollo: {
    users: gql`query {
        users{
            id
            name
        }
  }`,
  },
  methods: {
    callSomeT() {
      this.$apollo.mutate({
        mutation: gql`mutation ($id:String, $input: UserInput){
                updateUser(id:$id, name:$input){
                    id
                }
            }`,
        variables:{
          id: this.neededId,
          input:{
            name: "New name"
          }
        },
      }).then((data)=>{
        console.log(data)
      }).catch((err)=>{
        console.log(err.data)
      })
    }
  },
}
</script>

<style scoped>

</style>
