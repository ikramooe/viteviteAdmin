<template>
  <div>
    
      <CCard >
            <CCardHeader>
              <CIcon name="cil-pencil"/> Form Elements
              <div class="card-header-actions">
              </div>
            </CCardHeader>
            <CCollapse :show="formCollapsed">
              <CCardBody>
                <CInput
                  v-model="chauffeur.nom"
                  description="Here's some help text"
                  type="text"
                  autocomplete="nom"
                  prepend="Nom "
                />
                <CInput
                  v-model="chauffeur.prenom"
                  description="Here's some help text"
                  type="text"
                  autocomplete="entreprise"
                  prepend="Nom Entreprise"
                />
                <CInput
                  v-model="chauffeur.wilaya"
                  description="Here's some help text"
                  type="text"
                  autocomplete="wilaya"
                  prepend="wilaya"
                />
                <CInput
                  v-model="chauffeur.phone"
                  prepend="+213"
                  type="email"
                  description="Email"
                />
                <CInput
                  :value="getDate(chauffeur.created_at)"
                  prepend="Date"
                  type=""
                  description="Date inscription"
                />
              </CCardBody>
            </CCollapse>
          </CCard>
        <CCard>
        <CCardHeader>
          Line Chart
        </CCardHeader>
        <CCardBody>
          <CChartLineExample :details="details" />
        </CCardBody>
      </CCard>
      
    

  </div>
</template>

<script>
import usersData from '../users/UsersData'
import CTableWrapper from '../base/Table'
import {db,realtimeDB} from '../../firebase'
import * as Charts from '../charts/index'

export default {
  name: 'Tables',
  components: { CTableWrapper , ...Charts},
  props:['chauffeur','details'],
  
  data(){
    return {
      documents:[],
      formCollapsed:true,
      inscription:'',
      wilayas:[
              'Adrar',
              'Chlef',
              'Laghouat',
              'Oum El Bouaghi',
              'Batna',
              'Béjaïa	',
              'Biskra',
              'Béchar',
              'Blida',
              'Bouira',
              'Tamanrasset',
              'Tébessa',
              'Tlemcen',
              'Tiaret',
              'Tizi Ouzou',
              'Alger',
              'Djelfa',
              'Jijel',
              'Sétif',
              'Saïda',
              'Skikda',
              'Sidi Bel Abbès',
              'Annaba',
              'Guelma',
              'Constantine',
              'Médéa',
              'Mostaganem',
              'M’Sila',
              'Mascara',
              'Ouargla',
              'Oran',
              'El Bayadh',
              'Illizi',
              'Bordj Bou Arreridj',
              'Boumerdès',
              'El Tarf',
              'Tindouf',
              'Tissemsilt',
              'El Oued',
              'Khenchela',
              'Souk Ahras',
              'Tipaza',
              'Mila',
              'Aïn Defla',
              'Naâma',
              'Aïn Témouchent',
              'Ghardaia',
              'Relizane'
            ],
            monthNames : ["Janvier", "Fevrier", "Mars", "Avril", "May", "Juin",
  "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Decembre"
],
     
  
    }
  },
  
  methods: {
    getDate(data){
       this.inscription=this.monthNames[new Date(data.seconds*1000).getMonth()];
       alert(this.inscription);
       return new Date(data.seconds*1000);
    },
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
