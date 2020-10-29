<template>
  <div>
    <CRow>
      <CCol lg="12">
        <CTableWrapper  :items="documents" >
          <template #header>
              <CIcon name="cil-grid"/> Simple Table
              <div class="card-header-actions">
                <CButton
                color="primary"
                variant="outline"
                square
                size="sm"
                > Ajouter un chauffeur
                </CButton>
                
              
            </div>
          </template>
        </CTableWrapper>
      </CCol>
    </CRow>


  </div>
</template>

<script>
import usersData from '../users/UsersData'
import CTableWrapper from '../base/Table'
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
    documents : db.collection('drivers')
 
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
