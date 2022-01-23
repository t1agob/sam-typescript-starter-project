import { lambdaHandler } from '../../app'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
let event: APIGatewayProxyEvent;

describe('Tests index', function () {
    it('verifies successful response', async () => {
        const resultExpected = JSON.stringify({
            message: 'hello world',
        });

        const result: APIGatewayProxyResult = await lambdaHandler(event)

        expect(result).toBeInstanceOf(Object);
        expect(result.statusCode).toEqual(200);
        expect(result.body).toBe(resultExpected);

        let response = JSON.parse(result.body);

        expect(response).toBeInstanceOf(Object);
        expect(response.message).toEqual("hello world");
    });
});
