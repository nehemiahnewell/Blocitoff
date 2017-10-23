/*global angular*/
/*global firebase*/
(function() {
  function HomeCtrl($scope, $firebaseArray, Task) {
    this.tasks = Task.getTasks();
    this.fresh = Task.getFreshTasks();
    this.old = Task.getOldTasks();
    this.currentview = 1;
    this.postText = "";
    this.postPriority = "low";
    this.postIt = function()
    {
      Task.send(this.postText,this.postPriority);
    };
    this.retire = function(idcode)
    {
      var deadRecord = this.tasks.$getRecord(idcode);
      deadRecord.sentAt = 0;
      this.tasks.$save(deadRecord);
    };
    this.dateOut = function(epoch)
    {
      var when = new Date(epoch);
      return when.toLocaleString();
    };
  }
  angular
    .module('toDoDestroy')
    .controller('HomeCtrl', ["$scope", "$firebaseArray","Task", HomeCtrl]);
})();