<template>
  <div class="add-essay">
    <el-tabs v-model="activeName">
      <el-tab-pane name="first">
        <span slot="label"><i class="el-icon-circle-plus"></i>添加主观题</span>
        <section class="append">
          <el-form :model="form" label-width="100px">
            <el-form-item label="所属科目">
              <el-input v-model="form.subject" placeholder="请输入考试科目"></el-input>
            </el-form-item>
            <el-form-item label="题目类型">
              <el-select v-model="form.type" placeholder="请选择题型" style="width: 100%;">
                <el-option label="问答题" value="1"></el-option>
                <el-option label="编程题" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="分值">
              <el-input-number v-model="form.score" :min="1" :max="100"></el-input-number>
            </el-form-item>
            <el-form-item label="难度等级">
              <el-select v-model="form.level" placeholder="选择难度等级" style="width: 100%;">
                <el-option label="简单" value="1"></el-option>
                <el-option label="一般" value="2"></el-option>
                <el-option label="较难" value="3"></el-option>
                <el-option label="困难" value="4"></el-option>
                <el-option label="极难" value="5"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="所属章节">
              <el-input v-model="form.section" placeholder="请输入所属章节"></el-input>
            </el-form-item>
            <el-form-item label="题目内容">
              <el-input type="textarea" v-model="form.question" placeholder="请输入题目内容" rows="4" resize="none"></el-input>
            </el-form-item>
            <el-form-item label="参考答案">
              <el-input type="textarea" v-model="form.answer" placeholder="请输入参考答案(评分标准)" rows="5" resize="none"></el-input>
            </el-form-item>
            <el-form-item label="题目解析">
              <el-input type="textarea" v-model="form.analysis" placeholder="请输入题目解析" rows="3" resize="none"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">立即添加</el-button>
              <el-button @click="resetForm">重置</el-button>
            </el-form-item>
          </el-form>
        </section>
      </el-tab-pane>
      <el-tab-pane name="second">
        <span slot="label"><i class="el-icon-view"></i>查看主观题</span>
        <div class="list">
          <el-table :data="pagination.records" border v-loading="loading">
            <el-table-column prop="questionId" label="题目ID" width="80"></el-table-column>
            <el-table-column prop="subject" label="科目" width="120"></el-table-column>
            <el-table-column prop="question" label="题目内容" width="300">
              <template slot-scope="scope">
                <div class="question-content">{{scope.row.question}}</div>
              </template>
            </el-table-column>
            <el-table-column prop="score" label="分值" width="80"></el-table-column>
            <el-table-column prop="level" label="难度" width="80">
              <template slot-scope="scope">
                <el-tag :type="getLevelType(scope.row.level)">{{scope.row.level}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="section" label="章节" width="120"></el-table-column>
            <el-table-column label="操作" width="150">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="viewDetail(scope.row)">查看</el-button>
                <el-button type="text" size="small" @click="deleteQuestion(scope.row.questionId)">删除</el-button>
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
      </el-tab-pane>
    </el-tabs>

    <el-dialog title="题目详情" :visible.sync="detailDialogVisible" width="60%">
      <div v-if="currentQuestion" class="detail-content">
        <el-descriptions :column="2" border>
          <el-descriptions-item label="题目ID">{{currentQuestion.questionId}}</el-descriptions-item>
          <el-descriptions-item label="科目">{{currentQuestion.subject}}</el-descriptions-item>
          <el-descriptions-item label="分值">{{currentQuestion.score}}</el-descriptions-item>
          <el-descriptions-item label="难度">{{currentQuestion.level}}</el-descriptions-item>
          <el-descriptions-item label="章节">{{currentQuestion.section}}</el-descriptions-item>
          <el-descriptions-item label="类型">{{currentQuestion.type == '1' ? '问答题' : '编程题'}}</el-descriptions-item>
        </el-descriptions>
        <div class="detail-section">
          <h4>题目内容</h4>
          <p>{{currentQuestion.question}}</p>
        </div>
        <div class="detail-section">
          <h4>参考答案</h4>
          <p class="answer">{{currentQuestion.answer}}</p>
        </div>
        <div class="detail-section">
          <h4>题目解析</h4>
          <p>{{currentQuestion.analysis || '暂无解析'}}</p>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'addEssayQuestion',
  data() {
    return {
      activeName: 'first',
      loading: false,
      detailDialogVisible: false,
      currentQuestion: null,
      form: {
        subject: '',
        question: '',
        answer: '',
        analysis: '',
        score: 10,
        level: '1',
        section: '',
        type: '1'
      },
      pagination: {
        current: 1,
        total: null,
        size: 10
      }
    }
  },
  created() {
    this.getQuestionList()
  },
  methods: {
    getQuestionList() {
      this.loading = true
      this.$axios(`/api/question/essay/list/${this.pagination.current}/${this.pagination.size}`).then(res => {
        if (res.data.code == 200) {
          this.pagination = res.data.data
          this.loading = false
        }
      }).catch(error => {
        this.loading = false
      })
    },
    onSubmit() {
      if (!this.form.subject || !this.form.question || !this.form.answer) {
        this.$message({
          type: 'error',
          message: '请填写完整信息'
        })
        return
      }
      this.$axios({
        url: '/api/question/essay',
        method: 'post',
        data: this.form
      }).then(res => {
        if (res.data.code == 200) {
          this.$message({
            type: 'success',
            message: '添加成功'
          })
          this.resetForm()
        } else {
          this.$message({
            type: 'error',
            message: '添加失败'
          })
        }
      })
    },
    resetForm() {
      this.form = {
        subject: '',
        question: '',
        answer: '',
        analysis: '',
        score: 10,
        level: '1',
        section: '',
        type: '1'
      }
    },
    handleSizeChange(val) {
      this.pagination.size = val
      this.getQuestionList()
    },
    handleCurrentChange(val) {
      this.pagination.current = val
      this.getQuestionList()
    },
    getLevelType(level) {
      const types = {
        '1': 'success',
        '2': 'info',
        '3': 'warning',
        '4': 'danger',
        '5': 'danger'
      }
      return types[level] || 'info'
    },
    viewDetail(row) {
      this.currentQuestion = row
      this.detailDialogVisible = true
    },
    deleteQuestion(questionId) {
      this.$confirm('确定删除该题目吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios({
          url: `/api/question/essay/${questionId}`,
          method: 'delete'
        }).then(res => {
          if (res.data.code == 200) {
            this.$message({
              type: 'success',
              message: '删除成功'
            })
            this.getQuestionList()
          } else {
            this.$message({
              type: 'error',
              message: '删除失败'
            })
          }
        })
      }).catch(() => {})
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.add-essay {
  padding: 20px;

  .append {
    width: 600px;
    max-width: 100%;
  }

  .list {
    .question-content {
      max-height: 60px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .el-pagination {
      margin-top: 20px;
      display: flex;
      justify-content: center;
    }
  }

  .detail-content {
    .detail-section {
      margin-top: 20px;

      h4 {
        margin-bottom: 10px;
        color: #409EFF;
      }

      p {
        line-height: 1.6;
        white-space: pre-wrap;
      }

      .answer {
        color: #67C23A;
        background: #f0f9eb;
        padding: 10px;
        border-radius: 4px;
      }
    }
  }
}
</style>
