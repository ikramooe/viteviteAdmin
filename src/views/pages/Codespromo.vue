<template>
  <div>
    <CRow>
      <CCol lg="12">
        <CTableWrapper :items="documents">
          <template #header>
            <CIcon name="cil-grid"/> Simple Table
            <div class="card-header-actions">
              <a 
                href="https://coreui.io/vue/docs/components/nav" 
                class="card-header-action" 
                rel="noreferrer noopener" 
                target="_blank"
              >
                <small class="text-muted">docs</small>
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
import CTableWrapper from '../base/TableCodepromo'
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
    documents : db.collection('CodesPromo')
 
  },
  methods: {    
  }
}
</script>
