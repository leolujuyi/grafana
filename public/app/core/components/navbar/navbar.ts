///<reference path="../../../headers/common.d.ts" />

import config from 'app/core/config';
import _ from 'lodash';
import $ from 'jquery';
import coreModule from '../../core_module';

import './menu';

export class NavbarCtrl {
  model: any;
  section: any;
  isSearching: boolean;

  /** @ngInject */
  constructor(private $scope, private $rootScope, private contextSrv) {
    this.section = this.model.section;

    $rootScope.onAppEvent('show-dash-search', () => this.isSearching = true, $scope);
    $rootScope.onAppEvent('hide-dash-search', () => this.isSearching = false, $scope);
  }

  showSearch() {
    this.$rootScope.appEvent('show-dash-search');
  }

  navItemClicked(navItem, evt) {
    if (navItem.clickHandler) {
      navItem.clickHandler();
      evt.preventDefault();
    }
  }
}

export function navbarDirective() {
  return {
    restrict: 'E',
    templateUrl: 'public/app/core/components/navbar/navbar.html',
    controller: NavbarCtrl,
    bindToController: true,
    transclude: true,
    controllerAs: 'ctrl',
    scope: {
      model: "=",
    },
    link: function(scope, elem) {
      elem.addClass('navbar');
    }
  };
}

coreModule.directive('navbar', navbarDirective);
