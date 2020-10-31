<template>
  <div>
    <CRow>
      <CCol lg="12">
        <CTableWrapper :items="documents">
          <template #header>
            <CIcon name="cil-grid"/> Simple Table
            <div class="card-header-actions">
             <a
                color="primary"
                variant="outline"
                square
                size="sm"
                href="/ajouter-entreprise"
                > Ajouter une entreprise
              </a>
              
            </div>
          </template>
        </CTableWrapper>
      </CCol>
    </CRow>


  </div>
</template>

<script>
import usersData from '../users/UsersData'
import CTableWrapper from '../base/TableEntreprise'
import {db,realtimeDB} from '../../firebase'

export default {
  name: 'Tables',
  components: { CTableWrapper },
  data(){
    return {
      documents:[],
    }
  
  },
  firestore:{
    documents : db.collection('Companies')
 
  },
  methods: {
    shuffleArray (array) {
      for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1))
        let temp = array[i]
        array[i] = array[j]
        array[j] = temp
      }
      return array
    },
    getShuffledUsersData () {
      return this.shuffleArray(usersData.slice(0))
    }

    
  }
}
</script>
