# lwcRTK
Lightning Web Component 를 위한 상태관리 라이브러리.

## Development Setup
### 해당 library 가 담고 있는 source code 에 대한 설명

    ├── lwcRTK                  # LWC에서 Redux-Toolkit을 사용할 수 있도록 LWC 를 Wrapping 하는 컴포넌트 
    │   ├── lwcRTk.js           # LWC Redux Util / Reducer Combine / store Configure / logger 생성등 Root Reducer & store를 구성하는 함수 제공
    │   └── reduxElement.js     # LWC에 Redux 관련 메서드를 구성하는 Wrapping Class
    │
    ├── lwcRtkProvider          # LWC컴포넌트에서 Store에 접근하고 Store의 상태값에 반응을 위한 Wrapping Component
    ├── lwcRtkLibs              # RTK 관련 라이브러리를 export 하는 Component
    │   ├── rtk.js              # Redux-Toolkit@4.5.0 Library
    │   └── reduxLogger.js      # RTK action 에 의한  prev state / action / next state / diff 등을 표시하는 logger  
    │
    └── lwcRtkInput             # redux state에 연동하여 input / checkbox / text / combo / multi combo / radio 등의 입출력을 공통화 하는 컴포넌트.
