<template>
  <div id="essayScore">
    <div class="title">
      <el-button type="primary" icon="el-icon-arrow-left" @click="goBack()">返回</el-button>
      <span>主观题成绩</span>
    </div>
    <div class="wrapper">
      <div class="info-bar" v-if="examInfo">
        <el-tag type="primary">考试科目: {{examInfo.source}}</el-tag>
        <el-tag type="success">总分: {{totalScore}}分</el-tag>
        <el-tag type="warning">得分: {{earnedScore}}分</el-tag>
      </div>
      <el-table :data="essayList" border v-loading="loading">
        <el-table-column prop="question" label="题目内容" width="300">
          <template slot-scope="scope">
            <div class="question-content">{{scope.row.question || '题目已删除'}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="studentAnswer" label="我的答案" width="250">
          <template slot-scope="scope">
            <div class="answer-content">{{scope.row.studentAnswer || '未作答'}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="rightAnswer" label="参考答案" width="200">
          <template slot-scope="scope">
            <div class="right-answer">{{scope.row.rightAnswer || '暂无'}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="score" label="得分" width="100">
          <template slot-scope="scope">
            <span v-if="scope.row.isGraded" :class="{'high-score': scope.row.score >= scope.row.totalScore * 0.6}">
              {{scope.row.score}} / {{scope.row.totalScore}}
            </span>
            <el-tag v-else type="warning">待批改</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="teacherComment" label="教师评语">
          <template slot-scope="scope">
            <span v-if="scope.row.teacherComment">{{scope.row.teacherComment}}</span>
            <span v-else class="no-comment">暂无评语</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'essayScore',
  data() {
    return {
      loading: false,
      essayList: [],
      examInfo: null,
      totalScore: 0,
      earnedScore: 0
    }
  },
  created() {
    this.getExamInfo()
    this.getStudentId()
    this.getEssayScores()
  },
  methods: {
    getExamInfo() {
      const examCode = this.$route.query.examCode
      this.$axios(`/api/exam/${examCode}`).then(res => {
        if (res.data.code == 200) {
          this.examInfo = res.data.data
        }
      })
    },
    getStudentId() {
      this.studentId = this.$cookies.get('userId')
    },
    getEssayScores() {
      const examCode = this.$route.query.examCode
      this.loading = true
      this.$axios(`/api/answerSheet/student/${examCode}/${this.studentId}`).then(res => {
        if (res.data.code == 200) {
          this.essayList = res.data.data
          this.calculateScore()
          this.loading = false
        }
      }).catch(error => {
        this.loading = false
      })
    },
    calculateScore() {
      let total = 0
      let earned = 0
      this.essayList.forEach(item => {
        total += item.totalScore || 0
        if (item.isGraded) {
          earned += item.score || 0
        }
      })
      this.totalScore = total
      this.earnedScore = earned
    },
    goBack() {
      this.$router.push({ path: '/studentScore' })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

#essayScore {
  padding: 20px;

  .title {
    margin-bottom: 20px;

    .el-button {
      margin-right: 20px;
    }
  }

  .info-bar {
    margin-bottom: 20px;

    .el-tag {
      margin-right: 15px;
      font-size: 14px;
    }
  }

  .question-content {
    max-height: 80px;
    overflow-y: auto;
    white-space: pre-wrap;
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
    font-size: 13px;
  }

  .high-score {
    color: #67C23A;
    font-weight: bold;
  }

  .no-comment {
    color: #999;
    font-style: italic;
  }
}
</style>
