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
        <template #supprimer="{item}" >
           <td>
            <CButton size="sm" color="danger" class="ml-1" @click="deleteItem(item)">
                Delete
              </CButton>
          </td> 
        </template>
      </CDataTable>
    </CCardBody>
  </CCard>
</template>

<script>
import {db,realtimeDB} from '../../firebase'
export default {
  name: 'Table',
  data(){
    return {
      details:[],
      setDetails:[],
      collapseDuration:0
    
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
        { key: 'code', _style:'min-width:200px' },
        { key: 'promotion', _style:'min-width:100px;' },
        'supprimer'
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
  methods: {
   deleteItem(item){
    db.collection('CodesPromo')
      .doc(item.id)
      .delete()
   }    

    

  }
}
</script>
