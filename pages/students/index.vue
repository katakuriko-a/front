<template>
  <div>
    <Header @detailClick="filterOpen()" @csvClick="csv()" @searched-students="searchedStudents($event, students)"/>
    <Detail ref="detail"  @filtered-students="filteredStudents($event, students)" />
    <List ref="list" />
  </div>
</template>

<script>
import Header from "~/components/students/header";
import List from "~/components/students/list";
import Detail from "~/components/students/filter";
export default {
  components: {
    Header,
    List,
    Detail,
  },
  data() {
    return {
      open: false,
      students:[],
    };
  },
  methods: {
    detail() {
      this.open = !this.open;
    },
    filterOpen() {
      this.$refs.detail.showFilter();
    },
    csv() {
      this.$refs.detail.csvOpen();
    },
    searchedStudents(students){
      this.students = students
      this.$refs.list.searchClick(this.students);
    },
    filteredStudents(students){
      this.students = students
      this.$refs.list.filterClick(this.students);
    }
  },
};
</script>
