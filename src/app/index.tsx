// App.js
import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { Groq } from 'groq-sdk';

// Initialize Groq client with error handling
let groq;
try {
  groq = new Groq({
    apiKey:'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',
  });
} catch (error) {
  console.error('Failed to initialize Groq:', error);
}

const EMOTIONS = {
  HAPPY: '😊',
  ANGRY: '😠',
  FRUSTRATED: '😤',
  SATISFIED: '😌',
  CONFUSED: '😕',
  NEUTRAL: '😐',
};

// Sample conversation structure for type checking
  const defaultConversation = {
    uuid: "",
    vcon: "0.0.1",
    created_at: "",
    redacted: {},
    group: [],
    parties: [],
    dialog: [],
    attachments: [],
    analysis: []
  };

  const App = () => {
    const [conversations, setConversations] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedConversation, setSelectedConversation] = useState(null);
    const [analysis, setAnalysis] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

  // Load conversation data with error handling
  useEffect(() => {
    const loadConversations = async () => {
      try {
        // TODO: Replace with your actual JSON data loading logic
        const mockData = [
          {
            
              "uuid": "0192a373-b107-8ecd-9dd8-dd37220d739c",
              "vcon": "0.0.1",
              "created_at": "2024-10-19T06:25:21.159955+00:00",
              "redacted": {},
              "group": [],
              "parties": [
                {
                  "tel": "+15531646447",
                  "mailto": "stephen.gray@accountingfirm.com",
                  "name": "Stephen Gray",
                  "meta": {
                    "role": "agent"
                  }
                },
                {
                  "tel": "+17043456157",
                  "mailto": "abigail.long@gmail.com",
                  "name": "Abigail Long",
                  "meta": {
                    "role": "customer"
                  }
                }
              ],
              "dialog": [
                {
                  "type": "recording",
                  "start": "2024-10-19T06:25:20.570507",
                  "duration": 57.576,
                  "parties": [
                    0,
                    1
                  ],
                  "mimetype": "audio/mp3",
                  "filename": "170cc673-0159-4551-a958-6020e0fb3e87.mp3",
                  "body": "",
                  "encoding": "base64url",
                  "alg": "sha256",
                  "signature": "crnctbQLoF0lLOG0nH8gB8mlX0TFAOLb0bOrRlbdv8s=",
                  "disposition": "ANSWERED"
                }
              ],
              "attachments": [
                {
                  "type": "generation_info",
                  "body": {
                    "agent_name": "Stephen Gray",
                    "customer_name": "Abigail Long",
                    "business": "Accounting Firm",
                    "problem": "billing",
                    "emotion": "surprised",
                    "prompt": "\nGenerate a fake conversation between a customer and an agent.\nThe agent should introduce themselves, their company and give the customer\ntheir name. The agent should ask for the customer's name.\nAs part of the conversation, have the agent ask for two pieces of\npersonal information.  Spell out numbers. For example, 1000 should be\nsaid as one zero zero zero, not one thousand. The conversation should be\nat least 10 lines long and be complete. At the end\nof the conversation, the agent should thank the customer for their time\nand end the conversation. Return the conversation formatted \nlike the following example:\n\n{'conversation': \n    [\n    {'speaker': 'Agent', 'message': 'xxxxx'}, \n    {'speaker': 'Customer', 'message': \"xxxxx.\"}, \n    {'speaker': 'Agent', 'message': \"xxxxxx\"}\n    ] \n}\n\n\nIn this conversation, the agent's name is Stephen Gray and the customer's name is Abigail Long.  The conversation is about Accounting Eagles (a Accounting Firm ) and is a conversation about billing.The customer is feeling {emotion}.",
                    "created_on": "2024-10-19T06:25:21.159890",
                    "model": "gpt-4o-mini"
                  },
                  "encoding": "none"
                }
              ],
              "analysis": [
                {
                  "type": "analysis_info",
                  "dialog": 0,
                  "vendor": "openai",
                  "body": [
                    {
                      "speaker": "Agent",
                      "message": "Hello, and thank you for contacting Accounting Eagles! My name is Stephen Gray. How can I assist you today?"
                    },
                    {
                      "speaker": "Customer",
                      "message": "Hi Stephen, my name is Abigail Long. I'm a bit confused about my latest bill."
                    },
                    {
                      "speaker": "Agent",
                      "message": "I understand, Abigail. Can you please provide me with your account number so I can look up your details?"
                    },
                    {
                      "speaker": "Customer",
                      "message": "Sure, my account number is two five eight seven four one."
                    },
                    {
                      "speaker": "Agent",
                      "message": "Thank you for that. Could you also confirm your date of birth, please? This is just for security purposes."
                    },
                    {
                      "speaker": "Customer",
                      "message": "Of course, my date of birth is September fifteenth, nineteen eighty-five."
                    },
                    {
                      "speaker": "Agent",
                      "message": "Thank you, Abigail. Let me take a moment to review your bill and see what the confusion might be."
                    },
                    {
                      "speaker": "Customer",
                      "message": "That would be great, I really appreciate it."
                    },
                    {
                      "speaker": "Agent",
                      "message": "I see here that there was a misunderstanding regarding a charge for extra services. I can help clarify that for you."
                    },
                    {
                      "speaker": "Customer",
                      "message": "Oh, that makes sense. Thank you for your help, Stephen."
                    },
                    {
                      "speaker": "Agent",
                      "message": "You're welcome, Abigail! Thank you for your time today. If you have any other questions, feel free to reach out to us again."
                    }
                  ],
                  "encoding": "none",
                  "vendor_schema": {
                    "model": "gpt-4o-mini",
                    "prompt": "\nGenerate a fake conversation between a customer and an agent.\nThe agent should introduce themselves, their company and give the customer\ntheir name. The agent should ask for the customer's name.\nAs part of the conversation, have the agent ask for two pieces of\npersonal information.  Spell out numbers. For example, 1000 should be\nsaid as one zero zero zero, not one thousand. The conversation should be\nat least 10 lines long and be complete. At the end\nof the conversation, the agent should thank the customer for their time\nand end the conversation. Return the conversation formatted \nlike the following example:\n\n{'conversation': \n    [\n    {'speaker': 'Agent', 'message': 'xxxxx'}, \n    {'speaker': 'Customer', 'message': \"xxxxx.\"}, \n    {'speaker': 'Agent', 'message': \"xxxxxx\"}\n    ] \n}\n\n\nIn this conversation, the agent's name is Stephen Gray and the customer's name is Abigail Long.  The conversation is about Accounting Eagles (a Accounting Firm ) and is a conversation about billing.The customer is feeling {emotion}."
                  }
                }
              ]
            },
            {
              "uuid": "0192a374-7be1-8f4f-9dd8-dd37220d739c",
              "vcon": "0.0.1",
              "created_at": "2024-10-19T06:26:13.089991+00:00",
              "redacted": {},
              "group": [],
              "parties": [
                {
                  "tel": "+17903057915",
                  "mailto": "roger.williams@accountingfirm.com",
                  "name": "Roger Williams",
                  "meta": {
                    "role": "agent"
                  }
                },
                {
                  "tel": "+17102931424",
                  "mailto": "joyce.hayes@gmail.com",
                  "name": "Joyce Hayes",
                  "meta": {
                    "role": "customer"
                  }
                }
              ],
              "dialog": [
                {
                  "type": "recording",
                  "start": "2024-10-19T06:26:12.524381",
                  "duration": 50.808,
                  "parties": [
                    0,
                    1
                  ],
                  "mimetype": "audio/mp3",
                  "filename": "69efc48a-9ffb-432b-aa50-12a5ee65f165.mp3",
                  "body": "",
                  "encoding": "base64url",
                  "alg": "sha256",
                  "signature": "9kMrJdBdLrJvmNUoyl_jZP3NPx-uK8D-WDs8YV_aaFo=",
                  "disposition": "ANSWERED"
                }
              ],
              "attachments": [
                {
                  "type": "generation_info",
                  "body": {
                    "agent_name": "Roger Williams",
                    "customer_name": "Joyce Hayes",
                    "business": "Accounting Firm",
                    "problem": "billing",
                    "emotion": "nervous",
                    "prompt": "\nGenerate a fake conversation between a customer and an agent.\nThe agent should introduce themselves, their company and give the customer\ntheir name. The agent should ask for the customer's name.\nAs part of the conversation, have the agent ask for two pieces of\npersonal information.  Spell out numbers. For example, 1000 should be\nsaid as one zero zero zero, not one thousand. The conversation should be\nat least 10 lines long and be complete. At the end\nof the conversation, the agent should thank the customer for their time\nand end the conversation. Return the conversation formatted \nlike the following example:\n\n{'conversation': \n    [\n    {'speaker': 'Agent', 'message': 'xxxxx'}, \n    {'speaker': 'Customer', 'message': \"xxxxx.\"}, \n    {'speaker': 'Agent', 'message': \"xxxxxx\"}\n    ] \n}\n\n\nIn this conversation, the agent's name is Roger Williams and the customer's name is Joyce Hayes.  The conversation is about Accounting Eagles (a Accounting Firm ) and is a conversation about billing.The customer is feeling {emotion}.",
                    "created_on": "2024-10-19T06:26:13.089920",
                    "model": "gpt-4o-mini"
                  },
                  "encoding": "none"
                }
              ],
              "analysis": [
                {
                  "type": "analysis_info",
                  "dialog": 0,
                  "vendor": "openai",
                  "body": [
                    {
                      "speaker": "Agent",
                      "message": "Hello! Thank you for reaching out to Accounting Eagles. My name is Roger Williams. How can I assist you today?"
                    },
                    {
                      "speaker": "Customer",
                      "message": "Hi Roger, my name is Joyce Hayes. I'm calling about a billing issue I have."
                    },
                    {
                      "speaker": "Agent",
                      "message": "It's nice to meet you, Joyce! I'm here to help. Could you please provide me with your account number?"
                    },
                    {
                      "speaker": "Customer",
                      "message": "Sure, it's two five three one zero four two."
                    },
                    {
                      "speaker": "Agent",
                      "message": "Thank you for that information. Now, could you also confirm your date of birth, please?"
                    },
                    {
                      "speaker": "Customer",
                      "message": "It's January seventh, nineteen eighty-five."
                    },
                    {
                      "speaker": "Agent",
                      "message": "Great, thanks Joyce! I see the issue here, and I understand that it can be frustrating."
                    },
                    {
                      "speaker": "Customer",
                      "message": "Yes, I've been feeling quite stressed about it."
                    },
                    {
                      "speaker": "Agent",
                      "message": "I completely understand. Let's work together to resolve this as quickly as possible."
                    },
                    {
                      "speaker": "Customer",
                      "message": "Thank you for your help, Roger."
                    },
                    {
                      "speaker": "Agent",
                      "message": "You're welcome, Joyce! I appreciate your patience. Thank you for your time, and please feel free to reach out if you have any more questions. Have a great day!"
                    }
                  ],
                  "encoding": "none",
                  "vendor_schema": {
                    "model": "gpt-4o-mini",
                    "prompt": "\nGenerate a fake conversation between a customer and an agent.\nThe agent should introduce themselves, their company and give the customer\ntheir name. The agent should ask for the customer's name.\nAs part of the conversation, have the agent ask for two pieces of\npersonal information.  Spell out numbers. For example, 1000 should be\nsaid as one zero zero zero, not one thousand. The conversation should be\nat least 10 lines long and be complete. At the end\nof the conversation, the agent should thank the customer for their time\nand end the conversation. Return the conversation formatted \nlike the following example:\n\n{'conversation': \n    [\n    {'speaker': 'Agent', 'message': 'xxxxx'}, \n    {'speaker': 'Customer', 'message': \"xxxxx.\"}, \n    {'speaker': 'Agent', 'message': \"xxxxxx\"}\n    ] \n}\n\n\nIn this conversation, the agent's name is Roger Williams and the customer's name is Joyce Hayes.  The conversation is about Accounting Eagles (a Accounting Firm ) and is a conversation about billing.The customer is feeling {emotion}."
                  }
                }
              ]
            },
            {
              "uuid": "0192a375-4cdf-86ff-9dd8-dd37220d739c",
              "vcon": "0.0.1",
              "created_at": "2024-10-19T06:27:06.591472+00:00",
              "redacted": {},
              "group": [],
              "parties": [
                {
                  "tel": "+19571376512",
                  "mailto": "jack.king@accountingfirm.com",
                  "name": "Jack King",
                  "meta": {
                    "role": "agent"
                  }
                },
                {
                  "tel": "+14364945072",
                  "mailto": "dorothy.butler@gmail.com",
                  "name": "Dorothy Butler",
                  "meta": {
                    "role": "customer"
                  }
                }
              ],
              "dialog": [
                {
                  "type": "recording",
                  "start": "2024-10-19T06:27:06.072361",
                  "duration": 55.104,
                  "parties": [
                    0,
                    1
                  ],
                  "mimetype": "audio/mp3",
                  "filename": "0c64604b-6632-4670-8343-ac7c16f3586b.mp3",
                  "body": "",
                  "encoding": "base64url",
                  "alg": "sha256",
                  "signature": "n2f6JCsiKBo-F9QjKiCRE_XokXku5swH8lZ8ibsEGPc=",
                  "disposition": "ANSWERED"
                }
              ],
              "attachments": [
                {
                  "type": "generation_info",
                  "body": {
                    "agent_name": "Jack King",
                    "customer_name": "Dorothy Butler",
                    "business": "Accounting Firm",
                    "problem": "billing",
                    "emotion": "confused",
                    "prompt": "\nGenerate a fake conversation between a customer and an agent.\nThe agent should introduce themselves, their company and give the customer\ntheir name. The agent should ask for the customer's name.\nAs part of the conversation, have the agent ask for two pieces of\npersonal information.  Spell out numbers. For example, 1000 should be\nsaid as one zero zero zero, not one thousand. The conversation should be\nat least 10 lines long and be complete. At the end\nof the conversation, the agent should thank the customer for their time\nand end the conversation. Return the conversation formatted \nlike the following example:\n\n{'conversation': \n    [\n    {'speaker': 'Agent', 'message': 'xxxxx'}, \n    {'speaker': 'Customer', 'message': \"xxxxx.\"}, \n    {'speaker': 'Agent', 'message': \"xxxxxx\"}\n    ] \n}\n\n\nIn this conversation, the agent's name is Jack King and the customer's name is Dorothy Butler.  The conversation is about Accounting Eagles (a Accounting Firm ) and is a conversation about billing.The customer is feeling {emotion}.",
                    "created_on": "2024-10-19T06:27:06.591397",
                    "model": "gpt-4o-mini"
                  },
                  "encoding": "none"
                }
              ],
              "analysis": [
                {
                  "type": "analysis_info",
                  "dialog": 0,
                  "vendor": "openai",
                  "body": [
                    {
                      "speaker": "Agent",
                      "message": "Hello! My name is Jack King, and I'm with Accounting Eagles, your trusted accounting firm."
                    },
                    {
                      "speaker": "Customer",
                      "message": "Hi Jack, nice to meet you."
                    },
                    {
                      "speaker": "Agent",
                      "message": "It's great to meet you too, Dorothy. May I have your full name to assist you better?"
                    },
                    {
                      "speaker": "Customer",
                      "message": "Sure, it\u2019s Dorothy Butler."
                    },
                    {
                      "speaker": "Agent",
                      "message": "Thank you, Dorothy. I see here that you have some questions about your billing. Can you please provide me with your account number?"
                    },
                    {
                      "speaker": "Customer",
                      "message": "Of course, my account number is two three four five six."
                    },
                    {
                      "speaker": "Agent",
                      "message": "Thank you for that information. Also, could you please provide your phone number for verification purposes?"
                    },
                    {
                      "speaker": "Customer",
                      "message": "Sure, it\u2019s five five five, one two three, four five six seven."
                    },
                    {
                      "speaker": "Agent",
                      "message": "Thank you, Dorothy. I appreciate your cooperation. Now, let\u2019s take a look at your billing issues."
                    },
                    {
                      "speaker": "Customer",
                      "message": "I hope we can resolve this soon; it's been quite stressful."
                    },
                    {
                      "speaker": "Agent",
                      "message": "I understand, and I assure you we will get this resolved as quickly as possible. Thank you for your time today, Dorothy!"
                    },
                    {
                      "speaker": "Customer",
                      "message": "Thank you, Jack!"
                    },
                    {
                      "speaker": "Agent",
                      "message": "You're welcome! Have a great day."
                    }
                  ],
                  "encoding": "none",
                  "vendor_schema": {
                    "model": "gpt-4o-mini",
                    "prompt": "\nGenerate a fake conversation between a customer and an agent.\nThe agent should introduce themselves, their company and give the customer\ntheir name. The agent should ask for the customer's name.\nAs part of the conversation, have the agent ask for two pieces of\npersonal information.  Spell out numbers. For example, 1000 should be\nsaid as one zero zero zero, not one thousand. The conversation should be\nat least 10 lines long and be complete. At the end\nof the conversation, the agent should thank the customer for their time\nand end the conversation. Return the conversation formatted \nlike the following example:\n\n{'conversation': \n    [\n    {'speaker': 'Agent', 'message': 'xxxxx'}, \n    {'speaker': 'Customer', 'message': \"xxxxx.\"}, \n    {'speaker': 'Agent', 'message': \"xxxxxx\"}\n    ] \n}\n\n\nIn this conversation, the agent's name is Jack King and the customer's name is Dorothy Butler.  The conversation is about Accounting Eagles (a Accounting Firm ) and is a conversation about billing.The customer is feeling {emotion}."
                  }
                }
              ]
            },
            {
              "uuid": "0192a374-16be-8a00-9dd8-dd37220d739c",
              "vcon": "0.0.1",
              "created_at": "2024-10-19T06:25:47.198668+00:00",
              "redacted": {},
              "group": [],
              "parties": [
                {
                  "tel": "+11955253288",
                  "mailto": "zachary.butler@accountingfirm.com",
                  "name": "Zachary Butler",
                  "meta": {
                    "role": "agent"
                  }
                },
                {
                  "tel": "+16517606115",
                  "mailto": "betty.jones@gmail.com",
                  "name": "Betty Jones",
                  "meta": {
                    "role": "customer"
                  }
                }
              ],
              "dialog": [
                {
                  "type": "recording",
                  "start": "2024-10-19T06:25:46.630775",
                  "duration": 61.872,
                  "parties": [
                    0,
                    1
                  ],
                  "mimetype": "audio/mp3",
                  "filename": "c7a8db06-8366-4e2b-a41b-a7687a930550.mp3",
                  "body": "",
                  "encoding": "base64url",
                  "alg": "sha256",
                  "signature": "hGcN1q7M2_HNM2eB9p-3PvzgvK-Kq-IiAc5WDSRLzq8=",
                  "disposition": "ANSWERED"
                }
              ],
              "attachments": [
                {
                  "type": "generation_info",
                  "body": {
                    "agent_name": "Zachary Butler",
                    "customer_name": "Betty Jones",
                    "business": "Accounting Firm",
                    "problem": "billing",
                    "emotion": "nervous",
                    "prompt": "\nGenerate a fake conversation between a customer and an agent.\nThe agent should introduce themselves, their company and give the customer\ntheir name. The agent should ask for the customer's name.\nAs part of the conversation, have the agent ask for two pieces of\npersonal information.  Spell out numbers. For example, 1000 should be\nsaid as one zero zero zero, not one thousand. The conversation should be\nat least 10 lines long and be complete. At the end\nof the conversation, the agent should thank the customer for their time\nand end the conversation. Return the conversation formatted \nlike the following example:\n\n{'conversation': \n    [\n    {'speaker': 'Agent', 'message': 'xxxxx'}, \n    {'speaker': 'Customer', 'message': \"xxxxx.\"}, \n    {'speaker': 'Agent', 'message': \"xxxxxx\"}\n    ] \n}\n\n\nIn this conversation, the agent's name is Zachary Butler and the customer's name is Betty Jones.  The conversation is about Accounting Eagles (a Accounting Firm ) and is a conversation about billing.The customer is feeling {emotion}.",
                    "created_on": "2024-10-19T06:25:47.198573",
                    "model": "gpt-4o-mini"
                  },
                  "encoding": "none"
                }
              ],
              "analysis": [
                {
                  "type": "analysis_info",
                  "dialog": 0,
                  "vendor": "openai",
                  "body": [
                    {
                      "speaker": "Agent",
                      "message": "Hello! My name is Zachary Butler, and I'm with Accounting Eagles. How can I assist you today?"
                    },
                    {
                      "speaker": "Customer",
                      "message": "Hi, Zachary. My name is Betty Jones, and I'm calling about my billing statement."
                    },
                    {
                      "speaker": "Agent",
                      "message": "Thank you for that information, Betty. I'm here to help you with your billing concerns. Could you please provide the last four digits of your Social Security Number for verification?"
                    },
                    {
                      "speaker": "Customer",
                      "message": "Sure, it's one two three four."
                    },
                    {
                      "speaker": "Agent",
                      "message": "Thank you, Betty. And could you also provide me with your account number, please?"
                    },
                    {
                      "speaker": "Customer",
                      "message": "My account number is four five six seven eight nine."
                    },
                    {
                      "speaker": "Agent",
                      "message": "I appreciate that information. Now, could you tell me what specific issues you are experiencing with your billing statement?"
                    },
                    {
                      "speaker": "Customer",
                      "message": "I noticed some charges that I don't recognize, and I'm feeling a bit frustrated about it."
                    },
                    {
                      "speaker": "Agent",
                      "message": "I understand how you feel, Betty. Let's dig into those charges together and see if we can clarify them for you."
                    },
                    {
                      "speaker": "Customer",
                      "message": "Thank you, I would really appreciate that, Zachary."
                    },
                    {
                      "speaker": "Agent",
                      "message": "You're welcome, Betty! Thank you for your time today. If you have any more questions after this, feel free to reach out. Have a great day!"
                    }
                  ],
                  "encoding": "none",
                  "vendor_schema": {
                    "model": "gpt-4o-mini",
                    "prompt": "\nGenerate a fake conversation between a customer and an agent.\nThe agent should introduce themselves, their company and give the customer\ntheir name. The agent should ask for the customer's name.\nAs part of the conversation, have the agent ask for two pieces of\npersonal information.  Spell out numbers. For example, 1000 should be\nsaid as one zero zero zero, not one thousand. The conversation should be\nat least 10 lines long and be complete. At the end\nof the conversation, the agent should thank the customer for their time\nand end the conversation. Return the conversation formatted \nlike the following example:\n\n{'conversation': \n    [\n    {'speaker': 'Agent', 'message': 'xxxxx'}, \n    {'speaker': 'Customer', 'message': \"xxxxx.\"}, \n    {'speaker': 'Agent', 'message': \"xxxxxx\"}\n    ] \n}\n\n\nIn this conversation, the agent's name is Zachary Butler and the customer's name is Betty Jones.  The conversation is about Accounting Eagles (a Accounting Firm ) and is a conversation about billing.The customer is feeling {emotion}."
                  }
                }
              ]
            }          
        ];
        
         // Validate data structure
         const validatedData = mockData.map(conv => ({
          ...defaultConversation,
          ...conv,
        }));
        
        
        setConversations(validatedData);
      } catch (error) {
        setError('Failed to load conversations');
        console.error('Error loading conversations:', error);
      }
    };

    loadConversations();
  }, []);


  const analyzeConversation = async (conversation) => {
    if (!conversation || !conversation.analysis || conversation.analysis.length === 0) {
      Alert.alert('Error', 'Invalid conversation data or missing analysis');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      if (!groq) {
        throw new Error('Groq client not initialized');
      }

      const analysisInfo = conversation.analysis[0].body;
      const conversationText = analysisInfo.map(msg => `${msg.speaker}: ${msg.message}`).join('\n');

      const prompt = `
        Analyze the following customer service conversation and provide:
        1. Customer's emotional state
        2. Key issues identified
        3. Suggestions for improvement
        4. Recommended response approach
        
        Conversation:
        ${conversationText}

        Please format your response as a JSON object with the following structure:
        {
          "emotionalState": "string",
          "keyIssues": "string",
          "suggestions": "string",
          "recommendedApproach": "string"
        }
      `;
      const completion = await groq.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: "mixtral-8x7b-32768",
        temperature: 1,
        max_tokens: 1024,
        top_p: 1,
        stream: false,
        stop: null
      });

      if (!completion?.choices?.[0]?.message?.content) {
        throw new Error('Empty or invalid response from Groq');
      }

      let analysisResult;
      try {
        analysisResult = JSON.parse(completion.choices[0].message.content);
        
        // Validate the parsed result
        if (!analysisResult.emotionalState || !analysisResult.keyIssues || 
            !analysisResult.suggestions || !analysisResult.recommendedApproach) {
          throw new Error('Incomplete analysis result');
        }
      } catch (parseError) {
        console.error('Failed to parse Groq response:', parseError);
        // Fallback to using the raw text if JSON parsing fails
        analysisResult = {
          emotionalState: "Unable to determine",
          keyIssues: "Error parsing response. Raw content: " + completion.choices[0].message.content.substring(0, 100) + "...",
          suggestions: "Unable to parse suggestions",
          recommendedApproach: "Unable to determine"
        };
      }

      setAnalysis(analysisResult);
    }  catch (error) {
      setError('Failed to analyze conversation: ' + error.message);
      Alert.alert('Error', error.message || 'Failed to analyze conversation');
      console.error('Analysis error:', error);
    } finally {
      setLoading(false);
    }
  };
  const generateResponse = async (conversation) => {
    if (!conversation || !conversation.analysis || conversation.analysis.length === 0) {
      Alert.alert('Error', 'Invalid conversation data');
      return;
    }
  
    setLoading(true);
    setError(null);
  
    try {
      if (!groq) {
        throw new Error('Groq client not initialized');
      }
  
      const conversationText = conversation.analysis[0].body
        .map(msg => `${msg.speaker}: ${msg.message}`)
        .join('\n');
  
      const prompt = `
        Generate an appropriate customer service response based on the following conversation:
        ${conversationText}
        
        Consider the customer's emotional state and provide a professional, empathetic response.
      `;
  
      const completion = await groq.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: "mixtral-8x7b-32768",
        temperature: 1,
        max_tokens: 1024,
        top_p: 1,
        stream: false,
        stop: null
      });
  
      if (!completion?.choices?.[0]?.message?.content) {
        throw new Error('Invalid response from Groq');
      }
  
      Alert.alert('Suggested Response', completion.choices[0].message.content);
    } catch (error) {
      setError('Failed to generate response: ' + error.message);
      Alert.alert('Error', error.message || 'Failed to generate response');
      console.error('Response generation error:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredConversations = conversations.filter(conv =>
    conv && JSON.stringify(conv).toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Determine emotion with error handling
  const determineEmotion = (conversation) => {
    if (!conversation || !conversation.analysis || conversation.analysis.length === 0) return EMOTIONS.NEUTRAL;
    
    const customerMessages = conversation.analysis[0].body.filter(msg => msg.speaker === "Customer");
    if (customerMessages.length === 0) return EMOTIONS.NEUTRAL;

    const lastCustomerMessage = customerMessages[customerMessages.length - 1].message.toLowerCase();
    
    if (lastCustomerMessage.includes('thank') || lastCustomerMessage.includes('great') || lastCustomerMessage.includes('happy')) return EMOTIONS.HAPPY;
    if (lastCustomerMessage.includes('angry') || lastCustomerMessage.includes('terrible')) return EMOTIONS.ANGRY;
    if (lastCustomerMessage.includes('confused') || lastCustomerMessage.includes('don\'t understand')) return EMOTIONS.CONFUSED;
    if (lastCustomerMessage.includes('frustrated') || lastCustomerMessage.includes('waiting')) return EMOTIONS.FRUSTRATED;
    return EMOTIONS.NEUTRAL;
  };

  return (
    <SafeAreaView style={styles.container}>
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
      
      <TextInput
        style={styles.searchInput}
        placeholder="Search conversations..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

<ScrollView style={styles.conversationList}>
        {filteredConversations.map((conv) => (
          <TouchableOpacity
            key={conv.uuid}
            style={styles.conversationItem}
            onPress={() => {
              setSelectedConversation(conv);
              analyzeConversation(conv);
            }}
          >
            <Text style={styles.customerName}>{conv.parties.find(p => p.meta.role === "customer")?.name || 'Unknown Customer'}</Text>
            <Text style={styles.timestamp}>
              {new Date(conv.created_at).toLocaleString()}
            </Text>
            <Text style={styles.emotion}>
              {determineEmotion(conv)}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      {selectedConversation && (
        <View style={styles.analysisContainer}>
          <Text style={styles.header}>Conversation Analysis</Text>
          {loading ? (
            <Text>Analyzing...</Text>
          ) : (
            analysis && (
              <>
                <Text style={styles.analysisItem}>
                  Emotional State: {analysis.emotionalState || 'Unknown'}
                </Text>
                <Text style={styles.analysisItem}>
                  Key Issues: {analysis.keyIssues || 'None identified'}
                </Text>
                <Text style={styles.analysisItem}>
                  Suggestions: {analysis.suggestions || 'No suggestions available'}
                </Text>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => generateResponse(selectedConversation)}
                >
                  <Text style={styles.buttonText}>Generate Response</Text>
                </TouchableOpacity>
              </>
            )
          )}
        </View>
      )}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  errorContainer: {
    backgroundColor: '#ffebee',
    padding: 10,
    margin: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ffcdd2',
  },
  errorText: {
    color: '#c62828',
    textAlign: 'center',
  },
  searchInput: {
    margin: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  conversationList: {
    flex: 1,
  },
  conversationItem: {
    backgroundColor: '#fff',
    padding: 15,
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  customerName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  timestamp: {
    fontSize: 12,
    color: '#666',
  },
  emotion: {
    fontSize: 20,
    position: 'absolute',
    right: 15,
    top: 15,
  },
  analysisContainer: {
    backgroundColor: '#fff',
    padding: 15,
    margin: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  analysisItem: {
    marginVertical: 5,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default App;