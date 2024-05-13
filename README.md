# Singular Transaction Gateway (STG)

Singular Transaction Gateway (STG) is a gateway service designed for implementing transactions across various networks. It operates through three layers, each serving distinct purposes in the transaction process:

1. **Onboarding Layer**
2. **App Layer**
3. **Protocol Layer**

## Onboarding Layer

The Onboarding Layer is responsible for the initial integration of participants from different networks, particularly those adhering to the BECKN protocol. This layer captures essential information such as `bap_id`, `bap_url`, and the domain of the network the user previously participated in. Additionally, it collects further details required for onboarding users to our platform, Xplor. 

**Explanation:**
- The Onboarding Layer gathers necessary participant information, including identifiers and network domains.
- It ensures compatibility with the BECKN protocol, facilitating seamless integration with various networks.
- Further details collected during onboarding enable a smooth transition of users to the Xplor platform.

## App Layer

The App Layer functions as an intermediary between the Onboarding Layer and the Protocol Layer, facilitating communication with the implementation layer. It handles requests such as `/search`, `/select`, `/init`, `/confirm`, and `/status`, providing immediate acknowledgment of acceptance or rejection to the implementation layer. Following successful response emission to the implementation layer, the App Layer communicates with the Protocol Layer to collect actual responses.

**Explanation:**
- Handles incoming requests from the implementation layer and provides immediate acknowledgment.
- Utilizes endpoints such as `/on_search`, `/on_select`, `/on_init`, `/on_confirm`, and `/on_status` for communication with the Protocol Layer.
- Segregates requests based on domain and forwards them to the appropriate Protocol Layer.

## Protocol Layer

The Protocol Layer establishes connections between the App Layer and different networks, such as ONEST and ONDC. It validates request payloads for all listed domains within different networks and validates responses coming from these networks with their respective domains. Each domain has its own module with controllers handling requests and responses.

**Explanation:**
- Establishes connections between the App Layer and various networks.
- Validates request payloads and responses across different network domains.
- Utilizes modules corresponding to domain names (e.g., retail, scholarship, course, job) with controllers handling requests and responses.

## Technologies Used

- **Backend Framework:** NestJS
- **Containerization:** Docker
- **Proxy Server:** NGINX
- **Database:** MongoDB

## Diagram

![Alt text](https://drive.google.com/file/d/1Cu-E05FOZUovb6VsCacDoIJVvN67K7wb/view?usp=sharing)

This diagram illustrates the flow of transactions through the three layers of the Singular Transaction Gateway, depicting their interactions and responsibilities.

## Conclusion

Singular Transaction Gateway (STG) provides a robust framework for implementing transactions across various networks, ensuring seamless communication, validation, and integration. With clearly defined layers and functionalities, STG streamlines the process of onboarding participants, handling requests, and managing protocol interactions.


