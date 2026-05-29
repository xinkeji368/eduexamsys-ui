<template>
  <div class="select-exam">
    <div class="title">
      <span>主观题批改</span>
    </div>
    <div class="wrapper">
      <el-table :data="pagination.records" border v-loading="loading">
        <el-table-column prop="source" label="试卷名称" width="180"></el-table-column>
        <el-table-column prop="description" label="介绍" width="200"></el-table-column>
        <el-table-column prop="institute" label="所属学院" width="120"></el-table-column>
        <el-table-column prop="major" label="所属专业" width="150"></el-table-column>
        <el-table-column prop="grade" label="年级" width="100"></el-table-column>
        <el-table-column prop="examDate" label="考试日期" width="120"></el-table-column>
        <el-table-column label="主观题批改状态" width="180">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="checkGradeStatus(scope.row.examCode)">查看状态</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button type="success" size="small" @click="toGrade(scope.row.examCode)">去批改</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagination.current"
        :page-sizes="[4, 8, 10, 20]"
        :page-size="pagination.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pagination.total"
        class="page">
      </el-pagination>
    </div>

    <el-dialog title="批改状态" :visible.sync="statusDialogVisible" width="30%">
      <div v-if="currentStatus" class="status-info">
        <el-progress :percentage="percentage" :color="progressColor"></el-progress>
        <div class="status-detail">
          <p>总题数: <span>{{currentStatus.total}}</span></p>
          <p>已批改: <span class="graded">{{currentStatus.graded}}</span></p>
          <p>待批改: <span class="ungraded">{{currentStatus.ungraded}}</span></p>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="statusDialogVisible = false">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'selectExamToGrade',
  data() {
    return {
      loading: false,
      statusDialogVisible: false,
      currentStatus: null,
      pagination: {
        current: 1,
        total: null,
        size: 10
      }
    }
  },
  computed: {
    percentage() {
      if (!this.currentStatus || this.currentStatus.total === 0) return 0
      return Math.round((this.currentStatus.graded / this.currentStatus.total) * 100)
    },
    progressColor() {
      if (!this.currentStatus) return '#67C23A'
      const percent = this.percentage
      if (percent < 30) return '#F56C6C'
      if (percent < 70) return '#E6A23C'
      return '#67C23A'
    }
  },
  created() {
    this.getExamInfo()
  },
  methods: {
    getExamInfo() {
      this.loading = true
      this.$axios(`/api/exams/${this.pagination.current}/${this.pagination.size}`).then(res => {
        if (res.data.code == 200) {
          this.pagination = res.data.data
          this.loading = false
        }
      }).catch(error => {
        this.loading = false
      })
    },
    handleSizeChange(val) {
      this.pagination.size = val
      this.getExamInfo()
    },
    handleCurrentChange(val) {
      this.pagination.current = val
      this.getExamInfo()
    },
    checkGradeStatus(examCode) {
      this.$axios(`/api/answerSheet/status/${examCode}`).then(res => {
        if (res.data.code == 200) {
          this.currentStatus = res.data.data
          this.statusDialogVisible = true
        }
      })
    },
    toGrade(examCode) {
      this.$router.push({ path: '/gradeEssay', query: { examCode: examCode } })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.select-exam {
  padding: 0px 40px;

  .title {
    padding: 20px 0;
    font-size: 18px;
    font-weight: bold;
  }

  .page {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .status-info {
    .el-progress {
      margin-bottom: 20px;
    }

    .status-detail {
      p {
        margin: 10px 0;
        font-size: 14px;

        span {
          font-weight: bold;
        }

        .graded {
          color: #67C23A;
        }

        .ungraded {
          color: #F56C6C;
        }
      }
    }
  }
}
</style>
