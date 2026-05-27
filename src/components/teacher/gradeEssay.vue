<template>
  <div id="gradeEssay">
    <div class="title">
      <el-button type="primary" icon="el-icon-arrow-left" @click="goBack()">返回</el-button>
      <span>主观题批改</span>
    </div>
    <div class="wrapper">
      <div class="status-bar">
        <el-tag type="success">总分: {{totalScore}}分</el-tag>
        <el-tag type="warning">已批改: {{gradedCount}}份</el-tag>
        <el-tag type="danger">待批改: {{ungradedCount}}份</el-tag>
      </div>
      <el-table :data="pagination.records" border v-loading="loading">
        <el-table-column prop="studentName" label="学生姓名" width="100"></el-table-column>
        <el-table-column prop="subject" label="考试科目" width="150"></el-table-column>
        <el-table-column prop="question" label="题目内容" width="300"></el-table-column>
        <el-table-column prop="studentAnswer" label="学生答案" width="300">
          <template slot-scope="scope">
            <div class="answer-content">{{scope.row.studentAnswer || '未作答'}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="rightAnswer" label="参考答案" width="250">
          <template slot-scope="scope">
            <div class="right-answer">{{scope.row.rightAnswer}}</div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="openGradeDialog(scope.row)">批改</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagination.current"
        :page-sizes="[5, 10, 20]"
        :page-size="pagination.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pagination.total">
      </el-pagination>
    </div>

    <el-dialog title="主观题批改" :visible.sync="dialogVisible" width="60%" :before-close="handleClose">
      <div class="grade-dialog" v-if="currentRecord">
        <el-form :model="gradeForm" label-width="100px">
          <el-form-item label="学生姓名">
            <el-input v-model="currentRecord.studentName" disabled></el-input>
          </el-form-item>
          <el-form-item label="题目内容">
            <el-input type="textarea" v-model="currentRecord.question" disabled rows="3"></el-input>
          </el-form-item>
          <el-form-item label="学生答案">
            <el-input type="textarea" v-model="currentRecord.studentAnswer" disabled rows="4"></el-input>
          </el-form-item>
          <el-form-item label="参考答案">
            <el-input type="textarea" v-model="currentRecord.rightAnswer" disabled rows="3"></el-input>
          </el-form-item>
          <el-form-item label="满分分值">
            <el-tag type="success">{{currentRecord.totalScore}}分</el-tag>
          </el-form-item>
          <el-form-item label="得分">
            <el-input-number v-model="gradeForm.score" :min="0" :max="currentRecord.totalScore"></el-input-number>
          </el-form-item>
          <el-form-item label="教师评语">
            <el-input type="textarea" v-model="gradeForm.teacherComment" placeholder="请输入评语" rows="3"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitGrade">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'gradeEssay',
  data() {
    return {
      loading: false,
      dialogVisible: false,
      currentRecord: null,
      gradeForm: {
        id: null,
        score: 0,
        teacherComment: ''
      },
      pagination: {
        current: 1,
        total: null,
        size: 10
      },
      gradedCount: 0,
      ungradedCount: 0,
      totalScore: 0
    }
  },
  created() {
    this.getExamCode()
    this.getGradingList()
    this.getGradingStatus()
  },
  methods: {
    getExamCode() {
      this.examCode = this.$route.query.examCode
    },
    getGradingList() {
      this.loading = true
      this.$axios(`/api/answerSheet/list/${this.pagination.current}/${this.pagination.size}/${this.examCode}`).then(res => {
        if (res.data.code == 200) {
          this.pagination = res.data.data
          this.loading = false
        }
      }).catch(error => {
        this.loading = false
        console.log(error)
      })
    },
    getGradingStatus() {
      this.$axios(`/api/answerSheet/status/${this.examCode}`).then(res => {
        if (res.data.code == 200) {
          const status = res.data.data
          this.totalScore = status.total || 0
          this.gradedCount = status.graded || 0
          this.ungradedCount = status.ungraded || 0
        }
      })
    },
    handleSizeChange(val) {
      this.pagination.size = val
      this.getGradingList()
    },
    handleCurrentChange(val) {
      this.pagination.current = val
      this.getGradingList()
    },
    openGradeDialog(row) {
      this.currentRecord = row
      this.gradeForm = {
        id: row.id,
        score: row.score || 0,
        teacherComment: row.teacherComment || ''
      }
      this.dialogVisible = true
    },
    submitGrade() {
      this.$axios({
        url: '/api/answerSheet/grade',
        method: 'put',
        data: this.gradeForm
      }).then(res => {
        if (res.data.code == 200) {
          this.$message({
            type: 'success',
            message: '批改成功'
          })
          this.dialogVisible = false
          this.getGradingList()
          this.getGradingStatus()
        } else {
          this.$message({
            type: 'error',
            message: '批改失败'
          })
        }
      })
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        }).catch(_ => {})
    },
    goBack() {
      this.$router.push({ path: '/selectExamToGrade' })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

#gradeEssay {
  padding: 20px;

  .title {
    margin-bottom: 20px;

    .el-button {
      margin-right: 20px;
    }
  }

  .status-bar {
    margin-bottom: 20px;

    .el-tag {
      margin-right: 15px;
      font-size: 14px;
    }
  }

  .answer-content {
    max-height: 80px;
    overflow-y: auto;
    white-space: pre-wrap;
  }

  .right-answer {
    max-height: 80px;
    overflow-y: auto;
    white-space: pre-wrap;
    color: #67C23A;
  }

  .grade-dialog {
    .el-input, .el-textarea {
      width: 90%;
    }
  }

  .el-pagination {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }
}
</style>
