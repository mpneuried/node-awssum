var fmt = require('fmt');
var awssum = require('awssum');
var amazon = awssum.load('amazon/amazon');
var CloudFront = awssum.load('amazon/cloudfront').CloudFront;

var env = process.env;
var accessKeyId = process.env.ACCESS_KEY_ID;
var secretAccessKey = process.env.SECRET_ACCESS_KEY;
var awsAccountId = process.env.AWS_ACCOUNT_ID;

var cloudFront = new CloudFront({
    'accessKeyId' : accessKeyId,
    'secretAccessKey' : secretAccessKey,
    'awsAccountId' : awsAccountId,
    'region' : amazon.US_EAST_1
});

fmt.field('Region', cloudFront.region() );
fmt.field('EndPoint', cloudFront.host() );
fmt.field('AccessKeyId', cloudFront.accessKeyId() );
fmt.field('SecretAccessKey', cloudFront.secretAccessKey().substr(0, 3) + '...' );
fmt.field('AwsAccountId', cloudFront.awsAccountId() );

var data = {
    OriginAccessId : 'HelloWorld',
    CallerReference : 'Test1',
    Comments : 'A Comment',
};

cloudFront.CreateOaiConfig(data, function(err, data) {
    fmt.msg("putting an origin access config - expecting success");
    fmt.dump(err, 'Error');
    fmt.dump(data, 'Data');
});
