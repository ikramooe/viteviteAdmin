<template>
  <CChartLine
    :datasets="defaultDatasets"
    labels="months"
  />
</template>

<script>
import { CChartLine } from '@coreui/vue-chartjs'

export default {
  name: 'CChartLineExample',
  props:['details'],
  components: { CChartLine },
  computed: {
    defaultDatasets () {
      return [
        {
          label: 'Data One',
          backgroundColor: 'rgb(228,102,81,0.9)',
          data: this.details
        },
        
      ]
    }
  }
}
</script>
