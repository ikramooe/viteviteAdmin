<template>
  <CCard>
    <CCardHeader>
      <slot name="header">
        <CIcon name="cil-grid"/> {{caption}}
      </slot>
    </CCardHeader>
    <CCardBody>
      <CDataTable
        :hover="hover"
        :striped="striped"
        :bordered="bordered"
        :small="small"
        :fixed="fixed"
        :items="items"
        :fields="fields"
        :items-per-page="small ? 10 : 5"
        :dark="dark"
        pagination
        columnFilter
        tableFilter
      
        itemsPerPageSelect
        sorter
        >
        <template #status="{item}">
          <td>
            <CBadge :color="getBadge(item.status)">{{item.status}}</CBadge>
          </td>
        </template>
        <template #change_state="{item}">
                <td class="py-2">
                    <CButton color="danger" variant="outline" square size="sm" @click="changeStatus(item)">
                        {{item.status =='Active' ? 'Suspend' : 'Activer'}}
                    </CButton>
                </td>
        </template>
        <template #show_details="{item, index}">
        <td class="py-2">
          <CButton
            color="primary"
            variant="outline"
            square
            size="sm"
            @click="toggleDetails(item, index)"
          >
            {{Boolean(item._toggled) ? 'Hide' : 'Show'}}
          </CButton>
        </td>
      </template>

         <template #details="{item}" >
           <CCollapse :show="Boolean(item._toggled)" :duration="collapseDuration">
          <CCardBody>
            
              <h4>
              A retourner : {{item.earnings['toSend']}} 
              </h4>
              <p class="text-muted">User since: {{item.created_at}}</p>
              <CButton size="sm" color="info" class="" @click="edit(item)">
                details
              </CButton>
              <CButton size="sm" color="danger" class="ml-1">
                Delete
              </CButton>
              <CButton v-if="item.status != 'Active'" size="sm" color="danger" class="ml-1">
                Activer
              </CButton>
            
          </CCardBody>
        </CCollapse>
        </template>


       
       
      </CDataTable>
    </CCardBody>
  </CCard>
</template>

<script>
import Router from '../../router/index'
export default {
  
  name: 'Table',
  data(){
    return {
      details:[],
      setDetails:[],
      collapseDuration:0,
      monthNames : ["Janvier", "Fevrier", "Mars", "Avril", "May", "Juin",
  "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Decembre"
],
    
    }
  },
  mounted(){
    this.items.map((item, id) => { 
        this.$set(item,'_toggled',false)
    });
  },
  props: {
    items: Array,
    fields:{
      type: Array,
      default () {
      return [
        { key: 'nom', _style:'min-width:200px' },
        { key: 'prenom', _style:'min-width:100px;' },
        'phone',
        'wilaya',
        { key: 'status', _style:'min-width:100px;' },
        { 
          key: 'show_details', 
          label: '', 
          _style: 'width:1%', 
          sorter: false, 
          filter: false
        },
        {
          key: 'change_state',
          label: '',
          _style: 'width:1%',
          sorter: false,
          filter: false
        }
      ]
       
      }
    },
    caption: {
      type: String,
      default: 'Table'
    },
    hover: Boolean,
    striped: Boolean,
    bordered: Boolean,
    small: Boolean,
    fixed: Boolean,
    dark: Boolean
  },
  data(){
    return {
      codes:[],
      monthNames : ["Janvier", "Fevrier", "Mars", "Avril", "May", "Juin",
  "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Decembre"
],

    }
  },
  methods: {
    getMonth(data){
      let trips=this.monthNames[new Date(data*1000).getMonth()];
      return trips;       

    },
     edit(item){
      
        this.monthNames.forEach(element => {
          var howmany =0;
          item.trips.forEach(trip => {
            var data = trip['created_at'].seconds;
            if(this.getMonth(data)==element){
                  howmany=howmany+1;
                  alert(howmany);
                  item.trips.pop(element);
            }
          });
          //alert('olaaa');
          this.codes.push(howmany);
        });
        Router.push({name:'details-chauffeur',params:{'chauffeur':item,'details':this.codes}}); 
    },
    getBadge (status) {
      return status === 'Active' ? 'success'
        : status === 'Inactive' ? 'secondary'
          : status === 'Pending' ? 'warning'
            : status === 'Suspended' ? 'danger' : 'primary'
    },

    toggleDetails (item) {
      console.log(item._toggled);
      this.$set(item, '_toggled', !item._toggled)
      console.log(item._toggled);
      
      this.collapseDuration = 300
      this.$nextTick(() => { this.collapseDuration = 0})
    },
    getIndex(item){      
      console.log( this.items.indexOf(item));
    }

  }
}
</script>
