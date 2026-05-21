// 我的考试页面
<template>
  <div id="myExam">
    <div class="title">
      <span>练习</span>
    </div>
    <div class="wrapper">
      <ul class="top">
        <li class="order active">全部</li>
        <li class="order">未开始</li>
        <li class="order">已开始</li>
        <li class="order">已过期</li>
        <li class="search-li"><div class="icon"><input type="text" placeholder="试卷名称" class="search" v-model="key"><i class="el-icon-search"></i></div></li>
        <li><el-button type="primary" @click="search()">搜索试卷</el-button></li>
      </ul>
      <ul class="paper" v-loading="loading">
        <li class="item" v-for="(item,index) in pagination.records" :key="index">
          <h4 @click="toExamMsg(item.examCode)">{{item.source}}</h4>
          <p class="name">{{item.source}}-{{item.description}}</p>
          <div class="info">
            <i class="el-icon-loading"></i><span>{{item.examDate.substr(0,10)}}</span>
            <i class="iconfont icon-icon-time"></i><span v-if="item.totalTime != null">限时{{item.totalTime}}分钟</span>
            <i class="iconfont icon-fenshu"></i><span>满分{{item.totalScore}}分</span>
          </div>
        </li>
      </ul>
      <div class="pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pagination.current"
          :page-sizes="[6, 10, 20, 40]"
          :page-size="pagination.size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // name: 'myExam'
  data() {
    return {
      loading: false,
      key: null, //搜索关键字
      allExam: null, //所有考试信息
      pagination: { //分页后的考试信息
        current: 1, //当前页
        total: null, //记录条数
        size: 10 //每页条数
      }
    }
  },
  created() {
    this.getExamInfo()
    this.loading = true
  },
  // watch: {

  // },
  methods: {
    //获取当前所有考试信息
    getExamInfo() {
      this.$axios(`/api/exams/${this.pagination.current}/${this.pagination.size}`).then(res => {
        this.pagination = res.data.data
        this.loading = false
        console.log(this.pagination)
      }).catch(error => {
        console.log(error)
      })
    },
    //改变当前记录条数
    handleSizeChange(val) {
      this.pagination.size = val
      this.getExamInfo()
    },
    //改变当前页码，重新发送请求
    handleCurrentChange(val) {
      this.pagination.current = val
      this.getExamInfo()
    },
    //搜索试卷
    search() {
      this.$axios('/api/exams').then(res => {
        if(res.data.code == 200) {
          let allExam = res.data.data
          let newPage = allExam.filter(item => {
            return item.source.includes(this.key)
          })
          this.pagination.records = newPage
        }
      })
    },
    //跳转到试卷详情页
    toExamMsg(examCode) {
      this.$router.push({path: '/examMsg', query: {examCode: examCode}})
      console.log(examCode)
    },
    //返回上一页
    goBack() {
      this.$router.push({path: '/student'})
    }
  }
}
</script>


<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.pagination {
  padding: var(--spacing-lg) 0 var(--spacing-xl) 0;

  .el-pagination {
    display: flex;
    justify-content: center;
  }
}

.paper {
  h4 {
    cursor: pointer;
    color: var(--text-color);
    transition: color 0.3s;

    &:hover {
      color: var(--primary-color);
    }
  }
}

.paper .item a {
  color: var(--text-color);
}

.wrapper .top .order {
  cursor: pointer;
  padding: var(--spacing-sm) var(--spacing-md);
  transition: all 0.3s;
  border-bottom: 2px solid transparent;

  &:hover {
    color: var(--primary-color);
    border-bottom: 2px solid var(--primary-color);
  }
}

.wrapper .top .order:visited,
.wrapper .top .order.active {
  color: var(--primary-color);
  border-bottom: 2px solid var(--primary-color);
}

.item .info i {
  margin-right: var(--spacing-xs);
  color: var(--primary-color);
}

.item .info span {
  margin-right: var(--spacing-md);
}

.paper .item {
  width: 310px;
  border-radius: var(--border-radius-medium);
  padding: var(--spacing-lg);
  border: 1px solid var(--border-light-color);
  box-shadow: var(--shadow-light);
  transition: all 0.6s var(--transition-function);
  margin: var(--spacing-md) var(--spacing-sm);
  background: var(--bg-color);

  &:hover {
    box-shadow: var(--shadow-medium);
    transform: translateY(-4px);
    border-color: var(--primary-color);
  }
}

.paper .item .info {
  font-size: 14px;
  color: var(--text-color-secondary);
}

.paper .item .name {
  font-size: 14px;
  color: var(--text-color-secondary);
  margin-top: var(--spacing-xs);
}

.paper * {
  margin: var(--spacing-md) 0;
}

.wrapper .paper {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.top .el-icon-search {
  position: absolute;
  right: var(--spacing-sm);
  top: 50%;
  transform: translateY(-50%);
}

.top .icon {
  position: relative;
}

.wrapper .top {
  border-bottom: 1px solid var(--border-light-color);
  margin-bottom: var(--spacing-md);
  display: flex;
  align-items: center;
  padding: var(--spacing-sm) 0;
  flex-wrap: wrap;
}

#myExam .search-li {
  margin-left: auto;
}

.top .search-li {
  margin-left: auto;
}

.top li {
  display: flex;
  align-items: center;
}

.top .search {
  margin-left: auto;
  padding: var(--spacing-sm);
  border-radius: var(--border-radius-small);
  border: 1px solid var(--border-color);
  transition: all 0.3s var(--transition-function);
  width: 200px;

  &:hover {
    color: var(--primary-color);
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.1);
  }

  &:focus {
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  }
}

.wrapper .top {
  display: flex;
}

.wrapper .top li {
  margin: var(--spacing-md);
}

#myExam {
  width: 1000px;
  margin: 0 auto;
  max-width: 100%;
}

#myExam .title {
  margin: var(--spacing-md);
  display: flex;
  align-items: center;
}

#myExam .title span {
  margin-left: var(--spacing-sm);
  font-size: 18px;
  font-weight: 600;
  color: var(--text-color);
}

#myExam .wrapper {
  background-color: var(--bg-color);
  border-radius: var(--border-radius-medium);
  padding: var(--spacing-md);
  box-shadow: var(--shadow-light);
}

@media (max-width: 768px) {
  #myExam {
    width: 100%;
  }

  .paper .item {
    width: 100%;
  }

  .wrapper .top {
    flex-direction: column;
    align-items: flex-start;
  }

  .top .search-li {
    margin-left: 0;
    margin-top: var(--spacing-sm);
    width: 100%;
  }

  .top .search {
    width: 100%;
  }
}
</style>
.top li {
  display: flex;
  align-items: center;
}
.top .search {
  margin-left: auto;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #eee;
  box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
  transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
}
.top .search:hover {
  color: #0195ff;
  border-color: #0195ff;
}
.wrapper .top {
  display: flex;
}
.wrapper .top li {
  margin: 20px;
}
#myExam {
  width: 1000px;
  margin: 0 auto;
}
#myExam .title {
  margin: 20px;
  display: flex;
  align-items: center;
}
#myExam .title span {
  margin-left: 10px;
  font-size: 18px;
  font-weight: bold;
}
#myExam .wrapper {
  background-color: #fff;
}
</style>
