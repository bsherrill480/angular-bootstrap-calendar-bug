const moment = require('moment'),
    MAX_EVENTS_DATE = moment();
MAX_EVENTS_DATE.add(2, 'years');

function CalendarCtrl(calendarConfig) {
    'ngInject';
    const vm = this;
    vm.$onInit = function () {
        // https://mattlewis92.github.io/angular-bootstrap-calendar/#?example=kitchen-sink
        //These variables MUST be set as a minimum for the calendar to work
        vm.calendarView = 'month';
        vm.viewDate = new Date();
        vm.events = [
            {
                title: 'An event',
                color: calendarConfig.colorTypes.warning,
                startsAt: moment().startOf('week').subtract(2, 'days').add(8, 'hours').toDate(),
                endsAt: moment().startOf('week').add(1, 'week').add(9, 'hours').toDate(),
                draggable: true,
                resizable: true,
            }, {
                title: '<i class="glyphicon glyphicon-asterisk"></i> <span class="text-primary">Another event</span>, with a <i>html</i> title',
                color: calendarConfig.colorTypes.info,
                startsAt: moment().subtract(1, 'day').toDate(),
                endsAt: moment().add(5, 'days').toDate(),
                draggable: true,
                resizable: true,
            }, {
                title: 'This is a really long event title that occurs on every year',
                color: calendarConfig.colorTypes.important,
                startsAt: moment().startOf('day').add(7, 'hours').toDate(),
                endsAt: moment().startOf('day').add(19, 'hours').toDate(),
                recursOn: 'year',
                draggable: true,
                resizable: true,
            }
        ];


        vm.cellIsOpen = true;

        vm.timespanClicked = function(date, cell) {
            console.log('timespan clicked');
            if (vm.calendarView === 'month') {
                if ((vm.cellIsOpen &&
                    moment(date).startOf('day').isSame(moment(vm.viewDate).startOf('day'))) ||
                    cell.events.length === 0 ||
                    !cell.inMonth) {
                    vm.cellIsOpen = false;
                } else {
                    console.log('setting open, viewdate', date);
                    vm.viewDate = date;
                    vm.cellIsOpen = true;
                }
            } else if (vm.calendarView === 'year') {
                if ((vm.cellIsOpen && moment(date).startOf('month').isSame(moment(vm.viewDate).startOf('month'))) || cell.events.length === 0) {
                    vm.cellIsOpen = false;
                } else {
                    vm.cellIsOpen = true;
                    vm.viewDate = date;
                }
            }
        };
    }
}

function calendar() {
    return {
        templateUrl: 'components/home/calendar.html',
        controller: CalendarCtrl,
        controllerAs: 'vm'
    }
}


export default {
    name: 'calendar',
    fn: calendar
};
