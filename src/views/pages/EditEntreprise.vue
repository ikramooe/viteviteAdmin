<template>
  <div>
    <CRow>
      <CCol lg="12">
       <transition>
       <CCard >
            <CCardHeader>
              <CIcon name="cil-pencil"/> Form Elements
              <div class="card-header-actions">

              </div>
            </CCardHeader>
            <CCollapse :show="formCollapsed">
              <CCardBody>
                <CInput
                  v-model="entreprise.name"
                  description="Here's some help text"
                  type="text"
                  autocomplete="entreprise"
                  prepend="Nom Entreprise"
                
                />
                <CInput
                  v-model="entreprise.adresse"
                  description="Here's some help text"
                  type="text"
                  autocomplete="adresse"
                  prepend="adresse"
            
                  
                />
                <CSelect
                  
                  prepend="wilaya"
                  :value.sync="entreprise.wilaya"
                  :options="wilayas"
                />

                <CInput
                  v-model="entreprise.email"
                  prepend="@"
                  type="email"
                  description="Email"
                />
                <CInput
                  v-model="entreprise.phone"
                  type="number"
                  prepend="+213"
                  description="Numero de telephone"
                />
                <CInput
                  v-model="entreprise.employees"
                  type="number"
                  prepend="Employees"
                  description="Le nombre d'employées "
                />
                <CInput
                  v-model="codes"

                  prepend="Codes"
                  description="les codes"
                />

                <div class="form-actions">
                  <CButton type="submit" color="primary" @click="save">Sauvegarder</CButton>
                  <CButton color="secondary">reset</CButton>
                </div>
              </CCardBody>
            </CCollapse>
          </CCard>
        </transition>
      
      </CCol>
    </CRow>


  </div>
</template>

<script>

import {db,realtimeDB} from '../../firebase'
import { jsPDF } from "jspdf"
import 'jspdf-autotable';
export default {
  name: 'Tables',
  props:['entreprise'],
  created(){
   this.entreprise.codes.forEach(element => {
      
      this.codes.push(element['code'])
   });
   
  },
  data(){
    return {
      documents:[],
      formCollapsed:true,
      nom:'',
      email:'',
      phone:'',
      adresse:'',
      wilaya:'Adrar',
      employees:'',
      codes:[],
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
    },
    gnrCodes(){
    	let text = " "
      let chars = this.nom+this.wilaya+this.phone;
      let len = 5;
      let j=0;
      this.codes=[];
      while(j<this.employees){
      for( let i=0; i < len; i++ ) {
				text += chars.charAt(Math.floor(Math.random() * chars.length))
      }
      
      text+="\n";
      let inp = {code:text,user:''};
      
      if(this.codes.indexOf(inp)== -1){ j++; this.codes.push(inp); }
      text="";
      }
      //alert(this.codes);

    },
    exportPDF(codes) {
      var vm = this
      var columns = [
        {title: "Entreprise", dataKey: "title"},
        {title: "Description", dataKey: "description"}
      ];
      
      
      var doc = new jsPDF({
        orientation: "landscape",
        unit: "in",
        format: [4, 2]
      });
      doc.setFontSize(22);
      doc.text(20, 20, 'Ziouane vitvite');
      doc.setFontSize(16);
      
      doc.table({
      head: [['Enteprise','wilaya','adresse','phone','employees','codes']],
      body: [
        [this.nom,this.wilaya,this.adresse,this.phone,this.employees,codes]
        // ...
      ],
      });
      doc.save('todos.pdf');
    },
  
    save(){
      
      db.collection('Companies').doc(this.entreprise.id).update({
          codes: this.entreprise.codes,
          name :this.entreprise.name,
          email:this.entreprise.email,
          adresse:this.entreprise.adresse,
          phone:this.entreprise.phone,
          employees:this.entreprise.employees,
          wilaya:this.entreprise.wilaya  
        
      });
      
      


    }

    

    
  }
}
</script>
