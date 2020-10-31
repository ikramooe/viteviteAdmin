<template>
  <div>
    <!-- Modal Component -->
    <CModal
      title="Ajouter Code promo"
      color="info"
      :show.sync="infoModal"
    >
        <CCard>
          <CCardBody>
            <CForm>
              <CInput
                v-model="code"
                label="Code Promo"
                :value="code"
              />
              <CInput
                v-model="promotion"
                label="Pourcentage Promo"
                valid-feedback="Thank you :)"
                :value="promotion"
                type="number"
                invalid-feedback="Please provide a number between 0 and 100"
                :is-valid="validator"
              />
            </CForm>
          </CCardBody>
          <CCardFooter>
            <CButton type="submit" size="sm" color="primary" @click="submit"><CIcon name="cil-check-circle"/> Submit</CButton>
            <CButton type="reset" size="sm" color="danger" @click="reset"><CIcon name="cil-ban"/> Reset</CButton>
          </CCardFooter>
        </CCard>
    </CModal>
    <!-- end modal -->
    <CRow>
      <CCol lg="12">
        <CTableWrapper :items="documents">
          <template #header>
            <CIcon name="cil-grid"/> Simple Table
            <div class="card-header-actions">
              <CButton
                color="primary"
                variant="outline"
                square
                size="sm"
                @click="infoModal = true"
                > Ajouter code promo
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
import CTableWrapper from '../base/TableCodepromo'
import {db,realtimeDB} from '../../firebase'

export default {
  name: 'Tables',
  components: { CTableWrapper },
  data(){
    return {
      documents:[],
      infoModal: false,
      promotion:0,
      code:'',
      valid:false,
    }
  
  },
  firestore:{
    documents : db.collection('CodesPromo')
 
  },
  methods: {    
    validator (val) {
       if(val > 0 && val <100) 
             this.valid=true;
       else this.valid=false;
       return this.valid;
      
    },
    reset(){
      this.promotion=0;
      this.code='';
    },
    submit(){
      if(this.valid){
      db.collection('CodesPromo').add({
          code: this.code,
          promotion: this.promotion,
      });
      this.infoModal=false
      
      }
    }
  }
}
</script>
