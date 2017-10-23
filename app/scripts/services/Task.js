/*global angular*/
/*global firebase*/
(function() {
  function Task($firebaseArray) {
    var ref = firebase.database().ref().child("task");
    var task_holder = $firebaseArray(ref);
    return {
      getTasks: function () {
        var tasks = $firebaseArray(ref);
        return tasks;
      },
      getFreshTasks: function () {
        var last_week = Date.now() - 604800000;
        var fresh = ref.orderByChild("sentAt").startAt(last_week);
        var tasks = $firebaseArray(fresh);
        return tasks;
      },
      getOldTasks: function () {
        var last_week = Date.now() - 604800000;
        var old = ref.orderByChild("sentAt").endAt(last_week);
        var tasks = $firebaseArray(old);
        return tasks;
      },
      send: function(postContent, postPriority) {
        task_holder.$add({ content: postContent, priority: postPriority, sentAt: Date.now()});
      }
    };
  }

  angular
    .module('toDoDestroy')
    .factory('Task', ['$firebaseArray', Task]);
})();