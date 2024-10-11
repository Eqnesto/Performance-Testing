# Performance Automation with JMeter

This repository contains automated tests for the [Fake Rest API](https://fakerestapi.azurewebsites.net/index.html) using [JMeter](https://jmeter.apache.org). It includes different test types such as load, volume, and spike tests with assertions. Reports are generated in HTML, showcasing the website's performance under various user loads.

## 🔧 How to Run

1. Clone repository:
   ```shell
   git clone https://github.com/Eqnesto/Project.git
   ```
1. Install [Java SDK](https://www.oracle.com/java/technologies/javase-downloads.html).
1. Download [JMeter](https://jmeter.apache.org/download_jmeter.cgi) and click `Binaries > apache-jmeter-5.#.#.zip`.
1. Unzip folder.
1. Open `bin` folder and run the `.bat` file.
5. Open JMX project.
6. Click `Start` icon to run.
7. To run in [Terminal](https://apps.microsoft.com/detail/9n0dx20hk701?hl=en-US&gl=US):
   1. Open Terminal.
   2. Navigate to `bin` folder in the JMeter directory.
   ```bash
   cd C:\Users\Eqnesto\Downloads\apache-jmeter-5.6.3\bin
   ```
   3. Run JMX file:
   ```bash
   jmeter -n -t test.jmx -l results.jtl
   ```
8. To run in [BlazeMeter](https://auth.blazemeter.com/auth/realms/blazect/protocol/saml/clients/blazemeter#/):
   1. Log in.
   2. Click `Create Test` and select `JMeter`.
   3. Upload JMX file.
   5. Click `Run Test`.

## 📄 Test Cases

1. **Activities API**
   * **GET Activities**: Tests fetching all activities successfully.
   * **POST Activities**: Tests creating new activities.
   * **GET Activities by ID**: Tests retrieving an activity by ID.
   * **UPDATE Activities**: Tests updating an existing activity by ID.
   * **DELETE Activities**: Tests deleting an activity by ID.

2. **Authors API**
   * **GET Authors**: Tests fetching all authors successfully.
   * **POST Authors**: Tests creating a new author.
   * **GET Author Books by ID**: Tests retrieving books by a specific author using their ID.
   * **GET Author by ID**: Tests retrieving an author by ID.
   * **UPDATE Author**: Tests updating an author by ID.
   * **DELETE Author**: Tests deleting an author by ID.

3. **Books API**
   * **GET Books**: Tests fetching all books successfully.
   * **POST Books**: Tests creating a new book.
   * **GET Books by ID**: Tests retrieving a specific book by ID.
   * **UPDATE Books**: Tests updating a book by ID.
   * **DELETE Books**: Tests deleting a book by ID.

4. **Covers API**
   * **GET Cover**: Tests fetching a book cover successfully.
   * **POST Cover**: Tests adding a new book cover.
   * **GET Cover by ID**: Tests retrieving a book cover by ID.
   * **UPDATE Cover**: Tests updating a book cover by ID.
   * **DELETE Cover**: Tests deleting a book cover by ID.

5. **Users API**
   * **GET Users**: Tests fetching all users successfully.
   * **POST User**: Tests creating a new user.
   * **GET User by ID**: Tests retrieving a specific user by ID.
   * **PUT User**: Tests updating a user by ID.
   * **DELETE User**: Tests deleting a user by ID.

## 🕙 Test Parameters

| **Type**        | **Users**        | **Ramp-Up**  | **Duration**    | **Description**                                                    |
|-----------------|------------------|------------------|-----------------|--------------------------------------------------------------------|
| **Load Test**    | 100 Users        | Gradual (10 Seconds)  | 30 Seconds      | Simulates normal expected traffic over a defined period of time.   |
| **Stress Test**  | 300 Users        | Instant (0 Second)   | 10 Seconds      | Simulates a high level of traffic to test the breaking point.      |
| **Spike Test**   | 500 Users        | Instant (0 Second)   | 10 Seconds      | Sudden increase in traffic to test system’s ability to handle spikes. |
| **Volume Test**  | 1000 Users       | Gradual (10 Minutes)| 1 Hour     | Sustained high volume of users over an extended period.            |
