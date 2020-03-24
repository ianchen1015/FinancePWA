<template>
  <f7-page name="expenses">

    <f7-block-title>{{ showMonth }} 月支出</f7-block-title>

    <f7-list v-if="this.$root.expensesData.length === 0" media-list class="skeleton-text">
      <f7-list-item
        title="Title"
        subtitle="Subtitle"
        v-for="item in [0,1,2,3,4,5]"
        :key="item"
      >
      <f7-skeleton-block style="width: 40px; height: 40px; border-radius: 50%" slot="media"></f7-skeleton-block>
      </f7-list-item>
    </f7-list>

    <f7-navbar :sliding="false" large>
      <f7-nav-title sliding>{{ showMonth }} 月支出</f7-nav-title>
      <f7-nav-title-large sliding>{{ showMonth }} 月支出</f7-nav-title-large>
    </f7-navbar>

    <f7-list>
      <f7-list-item v-for="item in this.$root.expensesData" link="#" after="Edit" :key="item.id"
        :title="item.name"
        :footer="item.category">
        <f7-icon slot="media" icon="demo-list-icon">
          {{ item.month }}/{{ item.day }}
        </f7-icon>
      </f7-list-item>
    </f7-list>

    <br>

  </f7-page>
</template>

<script>
export default {
  data() {
    return {
      viewMode: 'month',
      showMonth: 1,
    }
  },
  mounted() {
    this.showMonth = parseInt(this.$root.currentDate.month).toString();
  }
}
</script>

<style scoped>

.demo-list-icon{
  width: 45px;
}

</style>