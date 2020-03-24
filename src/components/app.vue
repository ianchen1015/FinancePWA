<template>
<f7-app :params="f7params" >

  <!-- Views/Tabs container -->
  <f7-views tabs class="safe-areas">
    <!-- Tabbar for switching views-tabs -->
    <f7-toolbar tabbar labels bottom>
      <f7-link tab-link="#view-addpage" text="記帳" tab-link-active icon-ios="f7:plus_circle"></f7-link>
      <f7-link tab-link="#view-expensespage" text="支出" icon-ios="f7:text_badge_minus"></f7-link>
      <f7-link tab-link="#view-incomespage" text="收入" icon-ios="f7:text_badge_plus"></f7-link>
      <f7-link tab-link="#view-budgetpage" text="錢包" icon-ios="f7:tray_full_fill"></f7-link>

      <!-- <f7-link tab-link="#view-home" tab-link-active icon-ios="f7:house_fill" icon-aurora="f7:house_fill" icon-md="material:home" text="Home"></f7-link>
      <f7-link tab-link="#view-catalog" icon-ios="f7:square_list_fill" icon-aurora="f7:square_list_fill" icon-md="material:view_list" text="Catalog"></f7-link>
      <f7-link tab-link="#view-settings" icon-ios="f7:gear" icon-aurora="f7:gear" icon-md="material:settings" text="Settings"></f7-link> -->
    </f7-toolbar>

    <f7-view id="view-addpage" main tab tab-active url="/"></f7-view>
    <f7-view id="view-expensespage" name="expense" tab url="/expenses/"></f7-view>
    <f7-view id="view-incomespage" name="incomes" tab url="/incomes/"></f7-view>
    <f7-view id="view-budgetpage" name="budget" tab url="/budget/"></f7-view>
    <!-- <f7-view id="view-home" main tab tab-active url="/home"></f7-view>
    <f7-view id="view-catalog" name="catalog" tab url="/catalog/"></f7-view>
    <f7-view id="view-settings" name="settings" tab url="/settings/"></f7-view> -->

  </f7-views>

  <!-- Popup -->
  <f7-popup id="add-popup">
    <f7-view>
      <f7-page>

        <f7-navbar title="Popup">
          <f7-nav-right>
            <f7-link popup-close>Close</f7-link>
          </f7-nav-right>
        </f7-navbar>

      </f7-page>
    </f7-view>
  </f7-popup>

</f7-app>
</template>
<script>

  import routes from '../js/routes.js';

  export default {
    data() {
      return {
        // Framework7 Parameters
        f7params: {
          name: 'FinancePWA', // App name
          theme: 'ios', // Automatic theme detection
          // App routes
          routes: routes,
        },
      }
    },
    mounted() {
      this.$f7ready((f7) => {
        // Call F7 APIs here
      });
    },
  }
</script>