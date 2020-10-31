<template>
  <div>
    
      <CCard>
        <CCardHeader>Bar Chart</CCardHeader>
        <CCardBody><CChartBarExample :codes="drivers" /></CCardBody>
      </CCard>
      <CCard>
        <CCardHeader>Bar Chart</CCardHeader>
        <CCardBody><CChartBarExample :codes="users" /></CCardBody>
      </CCard>
      <CCard>
        <CCardHeader>
          Line Chart
        </CCardHeader>
        <CCardBody>
          <CChartLineExample/>
        </CCardBody>
      </CCard>
    
  </div>
</template>

<script>

import {db,realtimeDB} from '../../firebase'
import * as Charts from '../charts/index'

export default {
  name: 'Tables',
  components: { ...Charts },
   mounted(){
     //this.getData();
     
    db.collection('drivers')
    .get()
    .then(querySnapshot => {
    const documents = querySnapshot.docs.map(doc => doc.data())
    this.wilayas.forEach(element => {
     const test =documents.filter((doc)=>{
      return doc['wilaya']==element });
      this.drivers.push(test.length);  
    });
    });

    db.collection('users')
    .get()
    .then(querySnapshot => {
    const documents = querySnapshot.docs.map(doc => doc.data())
    this.wilayas.forEach(element => {
     const test =documents.filter((doc)=>{
      return doc['wilaya']==element });
      this.users.push(test.length);  
    });
    });


  
     
     
     
     //this.firestore;
     //alert(this.drivers);
     
   },
  data(){
    return {
      documents:[],
      codes:[[]],
      drivers:[],
      users:[],
      
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
   getem(){
    this.drivers = db.collection('drivers')
    }
   
  },
  methods:{
   getData(){
     this.drivers=db.collection('drivers');
     //alert(this.drivers);
     
     //alert(this.drivers);
    /*
    this.wilayas.forEach(element => {
      
      output =  db.collection('drivers').where('wilaya','==',element).get();
      if(output!=null){
      let input = output.length;
      alert(input);
      this.codes.push(input);
      }
    
    }); 
    */ 
 
   }
  }
  
    
  
}
</script>
