<template>
  <f7-page name="incomes">

    <f7-navbar :sliding="false" large>
      <f7-nav-title sliding>收入</f7-nav-title>
      <f7-nav-title-large sliding>收入</f7-nav-title-large>
    </f7-navbar>

    <f7-block-title>全部收入</f7-block-title>

    <f7-list v-if="this.$root.incomesData.length === 0" media-list class="skeleton-text">
      <f7-list-item
        title="Title"
        subtitle="Subtitle"
        v-for="item in [0,1,2,3,4,5]"
        :key="item"
      >
      <f7-skeleton-block style="width: 40px; height: 40px; border-radius: 50%" slot="media"></f7-skeleton-block>
      </f7-list-item>
    </f7-list>

    <f7-list>
      <f7-list-item v-for="item in this.$root.incomesData" after="Edit" :key="item.id"
        :title="item.name"
        :footer="item.year + '/' + item.month + '/' + item.day"
        :after="item.value">
      </f7-list-item>
    </f7-list>

  </f7-page>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  mounted() {
  },
  methods: {
  }  
}
</script>

<style scoped>
</style>