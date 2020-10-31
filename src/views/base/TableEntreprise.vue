<template>
<CCard>
    <CCardHeader>
        <slot name="header">
            <CIcon name="cil-grid" /> {{caption}}
        </slot>
    </CCardHeader>
    <CCardBody>
        <CDataTable :hover="hover" :striped="striped" :bordered="bordered" :small="small" :fixed="fixed" :items="items" :fields="fields" :items-per-page="small ? 10 : 5" :dark="dark" pagination columnFilter tableFilter itemsPerPageSelect sorter>
            <template #employees="{item}">
                <td>
                    <span>{{item.codes.length}}</span>
                </td>
            </template>
            <template #show_details="{item, index}">
                <td class="py-2">
                    <CButton color="primary" variant="outline" square size="sm" @click="toggleDetails(item, index)">
                        {{Boolean(item._toggled) ? 'Hide' : 'Show'}}
                    </CButton>
                </td>
            </template>
            <template #change_status="{item}">
                <td class="py-2">
                    <CButton color="danger" variant="outline" square size="sm" @click="changeStatus(item)">
                        {{item.status =='Active' ? 'Suspend' : 'Activer'}}
                    </CButton>
                </td>
            </template>
            <template #status="{item}">
                <td>
                    <CBadge :color="getBadge(item.status)">{{item.status}}</CBadge>
                </td>
            </template>
            <template #details="{item}">
                <CCollapse :show="Boolean(item._toggled)" :duration="collapseDuration">
                    <CCardBody>

                        <h5>Codes des employées</h5>
                        <ul v-for="code in item.codes" :key="code['code']">
                            <li> {{code['code']}} {{code['user']}} </li>
                        </ul>

                        <CButton size="sm" color="info" class="" @click="edit(item)">
                            Edit
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
import {db,realtimeDB} from '../../firebase'
import Router from '../../router/index'
export default {
    name: 'Table',
    data() {
        return {
            details: [],
            setDetails: [],
            collapseDuration: 0

        }
    },
    mounted() {
        this.items.map((item, id) => {
            this.$set(item, '_toggled', false)
        });
    },
    props: {
        items: Array,
        fields: {
            type: Array,
            default () {
                return [{
                        key: 'name',
                        _style: 'min-width:200px'
                    },
                    {
                        key: 'wilaya',
                        _style: 'min-width:100px;'
                    },

                    {
                        key: 'status',
                        _style: 'min-width:100px;'
                    },
                    'employees',
                    {
                        key: 'show_details',
                        label: '',
                        _style: 'width:1%',
                        sorter: false,
                        filter: false
                    },
                    {
                        key: 'change_status',
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

    methods: {
        edit(item){
            alert(item);
           Router.push({name:'Edit',params:{'entreprise':item}}); 
        },
        
        getBadge(status) {
            return status === 'Active' ? 'success' :
                status === 'Inactive' ? 'secondary' :
                status === 'Pending' ? 'warning' :
                status === 'Suspended' ? 'danger' : 'primary'
        },

        toggleDetails(item) {

            this.$set(item, '_toggled', !item._toggled)
            this.collapseDuration = 300
            this.$nextTick(() => {
                this.collapseDuration = 0
            })
        },
        getIndex(item) {
            console.log(this.items.indexOf(item));
        },
        changeStatus(item) {
            let current = '';
            (item.status == 'Active') ? current="Suspended" : current="Active";
            db.collection('Companies')
                .doc(item.id)
                .update({
                    'status':current
                });

        }

    }
}
</script>
