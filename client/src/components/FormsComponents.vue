<template lang="html">
  <section class="form-register-component">
    <div class="panel-body">
      <form>
        <vue-form-generator :schema="schema" :model="model"></vue-form-generator>
        <input type=submit>
  
      </form>
    </div>
  </section>
</template>

<script lang="js">
  import VueFormGenerator from "vue-form-generator";
  import moment from 'moment'
  
  export default {
    name: 'form-register-component',
    props: [],
    components: {
      "vue-form-generator": VueFormGenerator.component
    },
    mounted() {
  
    },
    data() {
      return {
  
        model: {
          id: 1,
          name: "",
          firstName: '',
          lastname: '',
          email: "",
          password: "",
          createdAt: "",
          skills: [],
          status: true,
          created: new Date().valueOf()
        },
  
        schema: {
          groups: [{
              legend: "User Details",
              fields: [{
                  type: "input",
                  inputType: "text",
                  label: "ID (disabled text field)",
                  model: "id",
                  readonly: true,
                  disabled: true
  
                },
                {
                  type: "input",
                  inputType: "text",
                  label: "Name",
                  model: "name",
                  id: "user_name",
                  placeholder: "Your name",
                  featured: true,
                  required: true,
                  onChanged: function(model, newVal, oldVal) {
                    console.log(`Model's name changed from ${oldVal} to ${newVal}. Model:`, model);
                  },
                },
                {
                  type: "input",
                  inputType: "email",
                  label: "E-mail",
                  model: "email",
                  placeholder: "User's e-mail address"
                },
                {
                  type: "input",
                  inputType: "password",
                  label: "Password",
                  model: "password",
                  min: 6,
                  required: true,
                  hint: "Minimum 6 characters",
                  validator: VueFormGenerator.validators.string,
                  onValidated: function(model, errors) {
                    if (errors.length > 0)
                      console.warn("Validation error in Name field! Errors:", errors);
                  },
                  visible: function(model) {
                    //visible if business is selected
                    return model.email.length > 1;
                  }
                },
                {
                  type: "textArea",
                  label: "Biography",
                  model: "bio",
                  hint: "Max 500 characters",
                  max: 500,
                  placeholder: "User's biography",
                  rows: 4,
                  validator: VueFormGenerator.validators.string
                }
              ]
            },
            {
              legend: "Skills & Status",
              fields: [{
                  type: "select",
                  label: "skills",
                  model: "type",
                  values: ["Javascript", "VueJS", "CSS3", "HTML5"]
                },
                {
                  type: "checkbox",
                  label: "Status",
                  model: "status",
                  default: true
                }, {
                  type: "checklist",
                  label: "Ingredient",
                  model: "ingredient",
                  values: [{
                      uuid: "a11e3f4b-d4f1-45ed-87fc-4eabda4e667e",
                      name: "Cherimoya"
                    },
                    {
                      uuid: "5ceb59c6-efe6-4c8a-a4bd-0ef621cd1e5d",
                      name: "Pummelo"
                    },
                    {
                      uuid: "39f05038-39ba-4cb9-8508-720806dcb20b",
                      name: "Jabuticaba"
                    },
                    {
                      uuid: "94adbe8d-f9db-481c-97c0-7198d5f3d810",
                      name: "Kiwano melon"
                    }
                  ],
                  checklistOptions: {
                    value: "uuid"
                  }
                },
                {
                  type: "input",
                  inputType: "text",
                  label: "Name",
                  model: "inputmax50",
                  maxlength: 50,
                  required: true,
                  placeholder: "User's full name",
                  validator: VueFormGenerator.validators.string
                },
                {
                  type: "label",
                  label: "Created",
                  model: "created",
                  get: function(model) {
                    return model && model.created ? moment(model.created).format("D-MMM-YYYY") : "-";
                  }
                },
                {
                  type: "radios",
                  label: "Identify the dolphin's name from the photo",
                  model: "dolphin",
                  values: [{
                      common_name: "White-beaked dolphin",
                      binomial_nomenclature: "Lagenorhynchus albirostris"
                    },
                    {
                      common_name: "Peale's dolphin",
                      binomial_nomenclature: "Lagenorhynchus australis"
                    },
                    {
                      common_name: "Northern right whale dolphin",
                      binomial_nomenclature: "Lissodelphis borealis"
                    },
                    {
                      common_name: "Common bottlenose dolphin",
                      binomial_nomenclature: "Tursiops truncatus"
                    },
                    {
                      common_name: "Long-beaked common dolphin",
                      binomial_nomenclature: "Delphinus capensis"
                    },
                    {
                      common_name: "Pacific white-sided dolphin",
                      binomial_nomenclature: "Lagenorhynchus obliquidens"
                    },
                    {
                      common_name: "Pantropical spotted dolphin",
                      binomial_nomenclature: "Stenella attenuata"
                    },
                    {
                      common_name: "Chilean dolphin",
                      binomial_nomenclature: "Cephalorhynchus eutropia"
                    }
                  ],
                  radiosOptions: {
                    value: "binomial_nomenclature",
                    name: "common_name"
                  }
                },
                {
                  type: "select",
                  label: "Language",
                  model: "lang",
                  required: true,
                  values: function() {
                    return [{
                        id: "en-GB",
                        name: "English (GB)"
                      },
                      {
                        id: "en-US",
                        name: "English (US)"
                      },
                      {
                        id: "de",
                        name: "German"
                      },
                      {
                        id: "it",
                        name: "Italic"
                      },
                      {
                        id: "fr",
                        name: "French"
                      }
                    ]
                  }
                },
  
  
  
              ]
            }
          ],
  
          formOptions: {
            validateAfterLoad: true,
            validateAfterChanged: true,
            // fieldIdPrefix: 'user-'
          }
        }
      }
    },
    methods: {
  
    },
    computed: {
  
    }
  }
</script>

<style scoped lang="css">
  .form-register-component {
    max-width: 400px;
    margin: 90px auto 90px auto;
  }
</style>